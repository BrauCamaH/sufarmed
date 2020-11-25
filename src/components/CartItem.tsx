import React, { useState } from 'react';

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
  IonSpinner,
} from '@ionic/react';
import './CartItem.css';
import { trash } from 'ionicons/icons';
import { OrderDetail } from '../models/OrderDetail';
import { useCartDispatch } from '../providers/CartProvider';
import { useGetProductById } from '../api/products';

export interface CartProps {
  orderDetail: OrderDetail;
}
const CartItem: React.FC<CartProps> = ({ orderDetail }) => {
  const dispatch = useCartDispatch();
  const [quantity, setQuantity] = useState<number>(orderDetail.quantity);
  const { isLoading, isError, data: product } = useGetProductById(
    orderDetail.product
  );

  return (
    <IonCard id="cart-item">
      <IonHeader>
        <IonToolbar>
          <IonButton
            fill="clear"
            color="danger"
            slot="end"
            size="small"
            onClick={() => {
              dispatch({ type: 'delete-item', payload: orderDetail.id });
            }}
          >
            <IonIcon icon={trash} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        {isLoading ? (
          <IonSpinner />
        ) : !isError ? (
          <>
            <IonCol>
              <img
                alt="card item"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
                src={product.img?.formats.small.url}
              />
            </IonCol>
            <IonCol>
              <IonCardContent>
                <IonCardSubtitle>{product.name}</IonCardSubtitle>
                {product.price}
              </IonCardContent>
            </IonCol>
            <IonCol>
              <IonItem lines="full">
                <IonLabel position="stacked">Cantidad</IonLabel>
                <IonInput
                  onIonChange={(e: any) => {
                    setQuantity(e.target.value);
                  }}
                  onIonBlur={() => {
                    dispatch({
                      type: 'update-quantity',
                      payload: { quantity, orderDetail },
                    });
                  }}
                  type="number"
                  value={quantity}
                  maxlength={4}
                />
              </IonItem>
            </IonCol>
          </>
        ) : null}
      </IonRow>
    </IonCard>
  );
};

export default CartItem;
