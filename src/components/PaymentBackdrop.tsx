import {
  IonButton,
  IonCol,
  IonModal,
  IonRow,
  IonSpinner,
  IonTitle,
} from '@ionic/react';
import { PaymentIntent } from '@stripe/stripe-js';
import React from 'react';

import './PaymentBackdrop.css';

interface PaymentBackdropProps {
  paymentIntent?: PaymentIntent | undefined;
}

const PaymentBackdrop: React.FC<PaymentBackdropProps> = ({ paymentIntent }) => {
  if (!paymentIntent) {
    return (
      <IonModal id="modal-backdrop" isOpen backdropDismiss={false}>
        <IonRow
          style={{ width: '100%', height: '100%' }}
          className="ion-justify-content-center ion-align-items-center"
        >
          <IonTitle color="light">Su pago se esta cargando</IonTitle>
          <IonSpinner />
        </IonRow>
      </IonModal>
    );
  }

  const { status } = paymentIntent;
  return (
    <IonModal
      id="modal-backdrop"
      isOpen={status !== 'requires_payment_method'}
      backdropDismiss={false}
    >
      <IonRow
        style={{ width: '100%', height: '100%' }}
        className="ion-justify-content-center ion-align-items-center "
      >
        {status === 'succeeded' ? (
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonTitle color="light">Su pago ser realizó con éxito</IonTitle>
              <IonButton routerLink="/home" routerDirection="root">
                Ir a inicio
              </IonButton>
              <IonButton routerLink="/orders" routerDirection="root">
                Ver mis compras
              </IonButton>
            </IonCol>
          </IonRow>
        ) : status === 'canceled' ? (
          <>
            <IonTitle color="light">
              Su pago fue cancelado por algún motivo
            </IonTitle>
            <IonButton routerLink="/home" routerDirection="root">
              Ir a inicio
            </IonButton>
          </>
        ) : (
          <IonSpinner />
        )}
      </IonRow>
    </IonModal>
  );
};

export default PaymentBackdrop;
