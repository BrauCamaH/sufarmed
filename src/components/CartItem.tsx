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
import './CartItem.css';
import { trash } from 'ionicons/icons';
import { OrderDetail } from '../models/OrderDetail';

export interface CartProps {
  orderDetail: OrderDetail;
}

const CartItem: React.FC<CartProps> = ({ orderDetail }) => {
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
            src={orderDetail.product.img?.formats.small.url}
          />
        </IonCol>
        <IonCol>
          <IonCardContent>
            <IonCardSubtitle>{orderDetail.product.name}</IonCardSubtitle>
            {orderDetail.price}
          </IonCardContent>
        </IonCol>
        <IonCol>
          <IonItem lines="full">
            <IonLabel position="stacked">Cantidad</IonLabel>
            <IonInput
              type="number"
              value={orderDetail.quantity}
              maxlength={4}
            />
          </IonItem>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

export default CartItem;
