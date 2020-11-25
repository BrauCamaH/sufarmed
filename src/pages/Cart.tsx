import React from 'react';
import {
  IonButton,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import Layout from '../components/Layout';

import CartItem from '../components/CartItem';
import { OrderDetail } from '../models/OrderDetail';
import { useCartState } from '../providers/CartProvider';

const CategoriesPage: React.FC = () => {
  const state = useCartState();

  return (
    <Layout>
      <IonToolbar>
        <IonItem slot="start">
          <IonTitle color="tertiary">Carrito</IonTitle>
        </IonItem>
      </IonToolbar>
      {state.status == 'isLoading' ? (
        <IonSpinner />
      ) : state.status !== 'isError' ? (
        <IonList>
          <IonRow id="cart-list" className="ion-justify-content-center">
            {state.cart.order_details.map((item: OrderDetail) => (
              <CartItem key={item.id} orderDetail={item} />
            ))}
          </IonRow>
          <IonToolbar className="ion-padding-top ion-padding-end">
            <div slot="end" className="ion-padding-end">
              <div className="ion-padding-end ">
                <IonTitle className="ion-padding-bottom">Total </IonTitle>
                <IonButton color="secondary">Continuar compra</IonButton>
              </div>
            </div>
          </IonToolbar>
          <IonItemDivider />
        </IonList>
      ) : (
        <p>Revise conexión a internet</p>
      )}
    </Layout>
  );
};

export default CategoriesPage;
