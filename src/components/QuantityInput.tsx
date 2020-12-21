import React from 'react';
import {
  IonButton,
  IonCardSubtitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import { add, remove } from 'ionicons/icons';

interface QuantityInputProps {
  isUpdating?: boolean;
  stock?: number;
  onChange?: () => any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  setQuantity,
  stock = 5,
  onChange,
}) => {
  return (
    <IonItem lines="none">
      <IonLabel slot="start">Cantidad:</IonLabel>
      <IonButton
        fill="clear"
        size="small"
        disabled={quantity <= 1}
        onClick={() => {
          setQuantity(quantity - 1);
        }}
      >
        <IonIcon icon={remove} />
      </IonButton>
      <IonList>
        <IonItem style={{ maxWidth: '60px' }}>
          <IonInput
            inputmode="numeric"
            value={quantity}
            onIonChange={(e: any) => {
              const newQuantity = parseInt(e.target.value);
              if (newQuantity < 1 || newQuantity > stock) {
                e.target.value = quantity;
              } else {
                if (Number.isInteger(newQuantity)) {
                  setQuantity(newQuantity);
                  if (onChange) onChange();
                } else {
                  e.target.value = quantity;
                }
              }
            }}
          />
        </IonItem>
      </IonList>
      <IonButton
        fill="clear"
        size="small"
        disabled={quantity === stock}
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <IonIcon icon={add} />
      </IonButton>
      <IonCardSubtitle>(stock {stock})</IonCardSubtitle>
    </IonItem>
  );
};

export default QuantityInput;
