import React, { useCallback, useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCol,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonSelect,
  IonSpinner,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { useCartDispatch, useCartState } from '../providers/CartProvider';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  PaymentIntent,
  StripeCardElementChangeEvent,
  StripeError,
} from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { Order } from '../models/Order';
import { useCreatePayment, useUpdateOrder } from '../api/orders';
import { useUserState } from '../providers/UserProvider';
import { formatToCurrency } from '../utils';

import CheckoutItem from '../components/CheckoutItem';
import PaymentBackdrop from '../components/PaymentBackdrop';

import './Checkout.css';
import { Address } from '../models/Address';
import { add } from 'ionicons/icons';
import { useUpdateInventory } from '../api/products';

interface CheckoutFormProps {
  order: Order;
  total: number;
  paymentIntent: PaymentIntent | undefined;
  setPaymentIntent: React.Dispatch<
    React.SetStateAction<PaymentIntent | undefined>
  >;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  order,
  total,
  paymentIntent,
  setPaymentIntent,
}) => {
  const { handleSubmit } = useForm();
  const state = useUserState();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useCartDispatch();
  const [createPayment, { isLoading }] = useCreatePayment();
  const [updateOrder] = useUpdateOrder();
  const [cardEvent, setCardEvent] = useState<StripeCardElementChangeEvent>();
  const [cardError, setCardError] = useState<StripeError>();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [selectedAddress, setSelectedAdress] = useState<Address | undefined>(
    state.user?.addresses[0]
  );
  const [updateInventory] = useUpdateInventory();

  const createPaymentIntent = useCallback(async () => {
    const InitialPaymentIntent = await createPayment({
      amount: Math.floor(total * 100),
    });
    setPaymentIntent(InitialPaymentIntent);
  }, []);

  useEffect(() => {
    createPaymentIntent();
  }, [total, createPaymentIntent]);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (cardElement && paymentIntent) {
      cardElement.on('change', function (event) {
        setCardEvent(event);
      });
      // Confirm Card Payment
      setLoadingPayment(true);
      if (paymentIntent.client_secret) {
        const {
          paymentIntent: updatedPaymentIntent,
          error,
        } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
          payment_method: { card: cardElement },
        });
        if (error) {
          console.error(error);
          setCardError(error);
          error.payment_intent && setPaymentIntent(error.payment_intent);
          setLoadingPayment(false);
        } else {
          setPaymentIntent(updatedPaymentIntent);
          if (!selectedAddress) {
            return;
          }
          const {
            name,
            address,
            city,
            state,
            phone,
            indications,
          } = selectedAddress;
          await updateOrder({
            id: order.id,
            data: {
              status: 'paid',
              name,
              address,
              city,
              state,
              phone,
              indications,
            },
          });
          await updateInventory(order.id);

          setLoadingPayment(false);

          dispatch({
            type: 'set-cart',
            payload: {
              id: 0,
              order_details: [],
              payment: 'cash',
              ship_date: '',
              status: 'created',
            },
          });
        }
      }
    }
  };

  return (
    <>
      <form className="ion-margin" onSubmit={handleSubmit(handlePay)}>
        {<PaymentBackdrop paymentIntent={paymentIntent} />}
        <IonTitle className="ion-text-start ion-margin-top ion-margin-bottom">
          Seleccione Domicilio
        </IonTitle>
        {state.user?.addresses.length !== 0 ? (
          <IonCard>
            <IonCardContent>
              <IonSelect
                placeholder="Seleccionar domicilio"
                interface="action-sheet"
                okText="Aceptar"
                cancelText="Cancelar"
                value={selectedAddress?.id}
                onIonChange={(e) =>
                  setSelectedAdress(
                    state.user?.addresses.find(
                      (item) => (item.id = e.detail.value)
                    )
                  )
                }
              >
                {state.user?.addresses.map((item) => {
                  return (
                    <IonSelectOption key={item.id} value={item.id}>
                      {item.address} {item.city}, {item.state}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonButton color="secondary" routerLink="/address">
            {'Agregar Domicilio  '} <IonIcon icon={add} />
          </IonButton>
        )}
        <IonTitle className="ion-text-start ion-margin-top ion-margin-bottom">
          Datos de la tarjeta
        </IonTitle>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {cardEvent?.error ? (
          <IonText color="danger">
            <p>{cardEvent.error.message}</p>
          </IonText>
        ) : cardError ? (
          <IonText color="danger">
            <p>{cardError.message}</p>
          </IonText>
        ) : (
          ''
        )}
        <IonButton
          disabled={!selectedAddress}
          slot="start"
          color="secondary"
          type="submit"
        >
          Realizar Pago ${total.toFixed(2)}
          {isLoading || loadingPayment ? (
            <IonSpinner className="ion-margin-start" />
          ) : (
            ''
          )}
        </IonButton>
        {!selectedAddress && (
          <IonText color="warning">
            <p>Se requiere domicilio</p>
          </IonText>
        )}
      </form>
    </>
  );
};

const Checkout: React.FC = () => {
  const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';
  const state = useCartState();
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  if (!state.cart.total) {
    return <PaymentBackdrop paymentIntent={paymentIntent} />;
  }

  return (
    <div>
      <IonRow>
        <IonCol style={{ maxWidth: '450px' }}>
          <IonCard>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Resumen de compra</IonTitle>
              </IonToolbar>
            </IonHeader>
            {state.cart.order_details.map((item) => (
              <CheckoutItem key={item.id} orderDetail={item} />
            ))}
            <IonItemDivider />
            <IonList lines="none">
              <IonItem>
                <IonTitle slot="start">Total</IonTitle>
                <IonTitle slot="end">
                  {formatToCurrency(state.cart.total)}
                </IonTitle>
              </IonItem>
            </IonList>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Realizar compra</IonTitle>
              </IonToolbar>
            </IonHeader>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                order={state.cart}
                total={state.cart.total}
                paymentIntent={paymentIntent}
                setPaymentIntent={setPaymentIntent}
              />
            </Elements>
          </IonCard>
        </IonCol>
      </IonRow>
    </div>
  );
};

export default Checkout;
