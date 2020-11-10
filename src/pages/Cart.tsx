import React from 'react';
import {
  IonButton,
  IonContent,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Product } from '../models/Product';

import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import Section from '../components/Section';

import CartItem from '../components/CartItem';

const products: Product[] = [
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/200',
    name: 'Product',
    summary: '$50 50tabs',
  },
];

const CategoriesPage: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonToolbar>
          <IonItem slot="start">
            <IonTitle color="tertiary">Carrito</IonTitle>
          </IonItem>
        </IonToolbar>
        <IonList>
          <IonRow
            id="cart-list"
            className="ion-justify-content-center ion-align-items-center"
          >
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
