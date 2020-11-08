import React from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from '@ionic/react';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';
import './Home.css';

const products: Product[] = [
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            {products.map((product) => (
              <IonCol key={product.id} size="6" size-md="3">
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
