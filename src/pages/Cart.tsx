import React, { useEffect, useState } from 'react';
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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CategoriesPage: React.FC = () => {
  const state = useCartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calculatedTotal = 0;
    state.cart.order_details.forEach(
      (item) => (calculatedTotal += item.price * item.quantity)
    );
    setTotal(calculatedTotal);
  }, [state.cart.order_details]);

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
                <IonTitle className="ion-padding-bottom">
                  <IonRow>
                    {'Total: '}
                    {state.status === 'isUpdating' ? (
                      <IonSpinner className="ion-margin-start" />
                    ) : (
                      `${formatter.format(total)}`
                    )}
                  </IonRow>
                </IonTitle>
                <IonButton
                  routerLink={`/checkout?total=${total}`}
                  routerDirection="none"
                  color="secondary"
                >
                  Continuar compra
                </IonButton>
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
