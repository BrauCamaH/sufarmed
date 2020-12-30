import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonGrid,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { OrderDetail } from '../models/OrderDetail';
import { useCartDispatch, useCartState } from '../providers/CartProvider';
import { formatToCurrency } from '../utils';

import CartItem from '../components/CartItem';

const CategoriesPage: React.FC = () => {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calculatedTotal = 0;
    state.cart.order_details.forEach(
      (item) => (calculatedTotal += item.price * item.quantity)
    );
    setTotal(calculatedTotal);
  }, [state.cart.order_details]);

  if (state.cart.order_details.length === 0) {
    return (
      <div>
        <IonToolbar>
          <IonItem slot="start">
            <IonTitle color="tertiary">Carrito</IonTitle>
          </IonItem>
        </IonToolbar>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonRow>
            <img
              style={{ width: '300px' }}
              src="assets/cart.svg"
              alt="sufarmed"
            />
          </IonRow>
          <IonToolbar>
            <IonTitle className="ion-margin ion-text-center">
              Carrito vacío
            </IonTitle>
          </IonToolbar>
        </IonRow>
      </div>
    );
  }

  return (
    <div>
      <IonToolbar>
        <IonItem slot="start">
          <IonTitle color="tertiary">Carrito</IonTitle>
        </IonItem>
      </IonToolbar>
      {state.status === 'isLoading' ? (
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
                      `${formatToCurrency(total)}`
                    )}
                  </IonRow>
                </IonTitle>
                <IonButton
                  disabled={state.status === 'isUpdating'}
                  routerLink={`/checkout`}
                  routerDirection="none"
                  color="secondary"
                  onClick={() => {
                    dispatch({ type: 'set-total', payload: total });
                  }}
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
    </div>
  );
};

export default CategoriesPage;
