import {
  IonCardSubtitle,
  IonCol,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import React from 'react';
import { useGetProductById } from '../api/products';
import { OrderDetail } from '../models/OrderDetail';
import { formatToCurrency } from '../utils';
import Spinner from './loaders/Spinner';

interface CheckoutItemProps {
  orderDetail: OrderDetail;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ orderDetail }) => {
  const { data: product, isLoading } = useGetProductById(orderDetail.product);

  return (
    <IonRow>
      {isLoading ? (
        <Spinner />
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
              <IonLabel>
                Precio : {formatToCurrency(orderDetail.price)}
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonItem lines="none">
            <IonCardSubtitle color="dark" slot="start">
              Precio total:
            </IonCardSubtitle>
            <IonCardSubtitle color="dark" slot="end">
              {formatToCurrency(orderDetail.price * orderDetail.quantity)}
            </IonCardSubtitle>
          </IonItem>
        </>
      )}
    </IonRow>
  );
};

export default CheckoutItem;
