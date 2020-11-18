import React from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from '@ionic/react';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import ProductCard from '../components/Product';
import Filter from '../components/Filter';
import { Product } from '../models/Product';
import './Home.css';

const products: Product[] = [
  {
    id: 1,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 5,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 6,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 7,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 8,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 9,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
  {
    id: 10,
    imgUrl: 'https://picsum.photos/500/300',
    name: 'Product',
    summary: '$50 50tabs',
  },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <Filter />
      <IonContent>
        <IonGrid fixed>
          <IonRow>
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
