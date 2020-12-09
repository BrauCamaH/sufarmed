import React, { useEffect, useState } from 'react';
import {
  IonBackdrop,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import CheckoutItem from '../components/CheckoutItem';
import { useCartState } from '../providers/CartProvider';
import Appbar from '../components/MinimalAppBar';
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
import { useLocation } from 'react-router-dom';

import './Checkout.css';
import { useForm } from 'react-hook-form';
import { Order } from '../models/Order';
import { useCreatePayment } from '../api/orders';
import PaymentBackdrop from '../components/PaymentBackdrop';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface CheckoutFormProps {
  order: Order;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ order, total }) => {
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [createPayment, { isLoading }] = useCreatePayment();
  const [cardEvent, setCardEvent] = useState<StripeCardElementChangeEvent>();
  const [cardError, setCardError] = useState<StripeError>();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();
  const createPaymentIntent = async () => {
    const InitialPaymentIntent = await createPayment({
      amount: Math.floor(total * 100),
    });
    setPaymentIntent(InitialPaymentIntent);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

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
          setLoadingPayment(false);
        }
      }
    }
  };

  return (
    <>
      <form className="ion-margin" onSubmit={handleSubmit(handlePay)}>
        {<PaymentBackdrop paymentIntent={paymentIntent} />}
        <IonTitle className="ion-margin-top ion-margin-bottom">
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
        <IonButton slot="start" color="secondary" type="submit">
          Realizar Pago ${total.toFixed(2)}{' '}
          {isLoading || loadingPayment ? <IonSpinner /> : ''}
        </IonButton>
      </form>
    </>
  );
};

const Checkout: React.FC = () => {
  const total = useQuery().get('total') || '';
  const state = useCartState();
  const stripePromise = loadStripe(
    'pk_test_F66BY1l50SclBxSGZnve6Mug00lSATA0ll'
  );

  return (
    <IonPage>
      <IonContent>
        <Appbar title="Comprar" />
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
                    {formatter.format(parseInt(total))}
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
                <CheckoutForm order={state.cart} total={+total} />
              </Elements>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
