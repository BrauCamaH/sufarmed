import {
  IonCardSubtitle,
  IonCol,
  IonItem,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import React from 'react';
import { useGetProductById } from '../api/products';
import { OrderDetail } from '../models/OrderDetail';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface CheckoutItemProps {
  orderDetail: OrderDetail;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ orderDetail }) => {
  const { data: product, isLoading } = useGetProductById(orderDetail.product);

  return (
    <IonRow>
      {isLoading ? (
        <IonSpinner />
      ) : (
        <>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <img src={product.img?.formats.thumbnail.url} alt="checkout" />
            </IonCol>
            <IonCol>
              <IonCardSubtitle className="ion-margin-bottom" color="dark">
                {product.name}
              </IonCardSubtitle>
              <IonCardSubtitle>
                Cantidad: {orderDetail.quantity}
              </IonCardSubtitle>
              <IonCardSubtitle>
                Precio : {formatter.format(orderDetail.price)}
              </IonCardSubtitle>
            </IonCol>
          </IonRow>
          <IonItem lines="none">
            <IonCardSubtitle slot="start">Precio total: </IonCardSubtitle>
            <IonCardSubtitle slot="end">
              {formatter.format(orderDetail.price * orderDetail.quantity)}
            </IonCardSubtitle>
          </IonItem>
        </>
      )}
    </IonRow>
  );
};

export default CheckoutItem;
