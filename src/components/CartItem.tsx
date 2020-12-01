import React, { useState } from 'react';

import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonRow,
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
import QuantityInput from './QuantityInput';

export interface CartProps {
  orderDetail: OrderDetail;
}
const CartItem: React.FC<CartProps> = ({ orderDetail }) => {
  const dispatch = useCartDispatch();
  const [quantity, setQuantity] = useState<number>(orderDetail.quantity);
  const { isLoading, isError, data: product } = useGetProductById(
    orderDetail.product
  );
  const [deleteOrderDetail] = useDeleteOrderDetail();
  const [updateOrderDetail] = useUpdateOrderDetail();

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
              dispatch({ type: 'set-status', payload: 'isUpdating' });
              await deleteOrderDetail({
                id: orderDetail.id,
              });
              dispatch({ type: 'delete-item', payload: orderDetail.id });
              dispatch({ type: 'set-status', payload: 'isFetched' });
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
            <img
              alt="card item"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
              src={product.img?.formats.small.url}
            />
            <IonCardContent>
              <IonCardSubtitle>{product.name}</IonCardSubtitle>
              {product.price}
            </IonCardContent>
            <QuantityInput
              quantity={quantity}
              setQuantity={setQuantity}
              stock={product.stock}
              onChange={async () => {
                dispatch({ type: 'set-status', payload: 'isUpdating' });
                await updateOrderDetail({
                  id: orderDetail.id,
                  data: { quantity },
                });
                dispatch({
                  type: 'update-quantity',
                  payload: { quantity, orderDetail },
                });
                dispatch({ type: 'set-status', payload: 'isFetched' });
              }}
            />
          </>
        ) : null}
      </IonRow>
    </IonCard>
  );
};

export default CartItem;
