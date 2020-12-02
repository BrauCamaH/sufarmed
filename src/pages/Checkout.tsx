import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import CheckoutItem from '../components/CheckoutItem';
import { useCartState } from '../providers/CartProvider';
import Appbar from '../components/MinimalAppBar';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface ShippingFormProps {
  setIsInformation: (isInformation: boolean) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ setIsInformation }) => {
  return (
    <form className="ion-margin">
      <IonItem>
        <IonLabel position="floating">Nombre y apellido</IonLabel>
        <IonInput name="name" />
      </IonItem>
      <IonRow>
        <IonItem>
          <IonLabel position="floating">Calle</IonLabel>
          <IonInput name="street" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número</IonLabel>
          <IonInput name="number" />
        </IonItem>
      </IonRow>
      <IonItem>
        <IonLabel position="floating">Código postal</IonLabel>
        <IonInput name="postal-code" />
      </IonItem>
      <IonRow>
        <IonItem>
          <IonLabel position="floating">Ciudad</IonLabel>
          <IonInput name="city" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Estado</IonLabel>
          <IonInput name="state" />
        </IonItem>
      </IonRow>
      <IonItem>
        <IonLabel position="floating">Telefono</IonLabel>
        <IonInput name="phone" />
      </IonItem>
      <IonToolbar>
        <IonButton
          slot="end"
          color="secondary"
          onClick={() => {
            setIsInformation(true);
          }}
        >
          Continuar con el pago
        </IonButton>
      </IonToolbar>
    </form>
  );
};

const Payment: React.FC = () => {
  return (
    <IonRow>
      <IonButton fill="clear">
        <IonIcon icon={chevronBack} />
        Regresar a información
      </IonButton>
    </IonRow>
  );
};

const Checkout: React.FC = () => {
  const state = useCartState();
  const [isInformation, setIsInformation] = useState(false);

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
                  <IonTitle slot="end">$000,00</IonTitle>
                </IonItem>
              </IonList>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonHeader>
                <IonToolbar>
                  <IonItem
                    button
                    lines="none"
                    slot="start"
                    onClick={() => {
                      setIsInformation(false);
                    }}
                  >
                    <IonTitle>Información</IonTitle>
                  </IonItem>
                  <IonIcon size="large" slot="start" icon={chevronForward} />
                  <IonItem
                    disabled={!isInformation}
                    button
                    lines="none"
                    slot="start"
                  >
                    <IonTitle>Pago</IonTitle>
                  </IonItem>
                </IonToolbar>
              </IonHeader>
              {isInformation ? (
                <Payment />
              ) : (
                <ShippingForm setIsInformation={setIsInformation} />
              )}
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
