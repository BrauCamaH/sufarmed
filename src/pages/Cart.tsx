import React from 'react';
import {
  IonButton,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Product } from '../models/Product';

import Layout from '../components/Layout';
import Section from '../components/Section';

import CartItem from '../components/CartItem';

const products: Product[] = [
  {
    id: 1,
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 5,
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
];

const CategoriesPage: React.FC = () => {
  return (
    <Layout>
      <IonToolbar>
        <IonItem slot="start">
          <IonTitle color="tertiary">Carrito</IonTitle>
        </IonItem>
      </IonToolbar>
      <IonList>
        <IonRow id="cart-list" className="ion-justify-content-center">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </IonRow>
        <IonToolbar className="ion-padding-top ion-padding-end">
          <div slot="end" className="ion-padding-end">
            <div className="ion-padding-end ">
              <IonTitle className="ion-padding-bottom">Total $000,0</IonTitle>
              <IonButton color="secondary">Continuar compra</IonButton>
            </div>
          </div>
        </IonToolbar>
        <IonItemDivider />
        <Section />
      </IonList>
    </Layout>
  );
};

export default CategoriesPage;
