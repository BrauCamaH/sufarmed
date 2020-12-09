import React from 'react';
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { close } from 'ionicons/icons';

interface OrderInfoFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const OrderInfoForm: React.FC<OrderInfoFormProps> = ({
  open,
  setOpen,
}) => {
  return (
    <IonModal isOpen={open}>
      <IonToolbar color="primary">
        <IonTitle slot="start">Modificar </IonTitle>
        <IonButton
          slot="end"
          fill="clear"
          color="light"
          onClick={() => {
            setOpen(false);
          }}
        >
          <IonIcon icon={close} />
        </IonButton>
      </IonToolbar>
      <form>
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
      </form>
    </IonModal>
  );
};
