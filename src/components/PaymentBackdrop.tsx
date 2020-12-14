import {
  IonButton,
  IonCol,
  IonModal,
  IonRow,
  IonSpinner,
  IonTitle,
} from '@ionic/react';
import { PaymentIntent } from '@stripe/stripe-js';
import React, { useState } from 'react';

import './PaymentBackdrop.css';

interface PaymentBackdropProps {
  paymentIntent?: PaymentIntent | undefined;
}

const PaymentBackdrop: React.FC<PaymentBackdropProps> = ({ paymentIntent }) => {
  const [open, setOpen] = useState(true);
  if (!paymentIntent) {
    return (
      <IonModal id="modal-backdrop" isOpen backdropDismiss={false}>
        <IonRow
          style={{ width: '100%', height: '100%' }}
          className="ion-justify-content-center ion-align-items-center"
        >
          <IonTitle>Su pago se esta cargando</IonTitle>
          <IonSpinner />
        </IonRow>
      </IonModal>
    );
  }

  const { status } = paymentIntent;
  return (
    <IonModal
      id="modal-backdrop"
      isOpen={status !== 'requires_payment_method' && open}
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
              <IonButton
                fill="clear"
                routerLink="/home"
                routerDirection="root"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Ir a inicio
              </IonButton>
              <IonButton
                routerLink="/orders"
                routerDirection="root"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Ver mis compras
              </IonButton>
            </IonCol>
          </IonRow>
        ) : status === 'canceled' ? (
          <>
            <IonTitle color="light">
              Su pago fue cancelado por algún motivo
            </IonTitle>
            <IonButton
              routerLink="/home"
              routerDirection="root"
              onClick={() => {
                setOpen(false);
              }}
            >
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
