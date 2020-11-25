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
import {
  useDeleteOrderDetail,
  useUpdateOrderDetail,
} from '../api/order-details';
import { useUserState } from '../providers/UserProvider';

export interface CartProps {
  orderDetail: OrderDetail;
}
const CartItem: React.FC<CartProps> = ({ orderDetail }) => {
  const dispatch = useCartDispatch();
  const [quantity, setQuantity] = useState<number>(orderDetail.quantity);
  const { isLoading, isError, data: product } = useGetProductById(
    orderDetail.product
  );
  const userState = useUserState();
  const [deleteOrderDetail] = useDeleteOrderDetail();
  const [updateOrderDetail, { isLoading: isUpdating }] = useUpdateOrderDetail();

  return (
    <IonCard id="cart-item">
      <IonHeader>
        <IonToolbar>
          <IonButton
            fill="clear"
            color="danger"
            slot="end"
            size="small"
            onClick={async () => {
              dispatch({ type: 'set-status', payload: 'isLoading' });
              await deleteOrderDetail({
                id: orderDetail.id,
                token: userState.jwt,
              });
              dispatch({ type: 'set-status', payload: 'isFetched' });
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
                  onIonBlur={async () => {
                    dispatch({ type: 'set-status', payload: 'isLoading' });
                    await updateOrderDetail({
                      id: orderDetail.id,
                      data: { quantity },
                      token: userState.jwt,
                    });
                    dispatch({
                      type: 'update-quantity',
                      payload: { quantity, orderDetail },
                    });
                    dispatch({ type: 'set-status', payload: 'isFetched' });
                  }}
                  type="number"
                  value={quantity}
                  maxlength={4}
                />
              </IonItem>
              {isUpdating && <IonSpinner />}
            </IonCol>
          </>
        ) : null}
      </IonRow>
    </IonCard>
  );
};

export default CartItem;
