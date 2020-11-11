import React from 'react';

import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonItem,
  IonToolbar,
  IonButton,
  IonIcon,
  IonHeader,
} from '@ionic/react';
import { Product } from '../models/Product';
import './CartItem.css';
import { trash } from 'ionicons/icons';

export interface CartProps {
  product: Product;
}

const CartItem: React.FC<CartProps> = ({ product }) => {
  return (
    <IonCard id="cart-item">
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" color="danger" slot="end" size="small">
            <IonIcon icon={trash} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <img
            alt="card item"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
            src={product.imgUrl}
          />
        </IonCol>
        <IonCol>
          <IonCardContent>
            <IonCardSubtitle>{product.name}</IonCardSubtitle>
            {product.summary}
          </IonCardContent>
        </IonCol>
        <IonCol>
          <IonItem lines="full">
            <IonLabel position="stacked">Cantidad</IonLabel>
            <IonInput type="number" maxlength={4} />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

export default CartItem;
