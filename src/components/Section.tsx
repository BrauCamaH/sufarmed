import React from 'react';
import {
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonButton,
  IonTitle,
} from '@ionic/react';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 0.1,
  slidesPerView: 4.5,
};

const productList: Product[] = [
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
];

interface SectionProps {
  products?: Product[];
}

const Section: React.FC<SectionProps> = ({ products }) => {
  const mockListItems = productList.map((product) => (
    <IonSlide key={product.id}>
      <ProductCard product={product} />
    </IonSlide>
  ));
  const ListItems = products?.map((product) => (
    <IonSlide key={product.id}>
      <ProductCard product={product} />
    </IonSlide>
  ));
  return (
    <IonGrid>
      <IonRow>
        <IonTitle>Section Name</IonTitle>
        <IonButton fill="clear">Ver más</IonButton>
      </IonRow>
      <IonSlides options={slideOpts}>
        {products ? ListItems : mockListItems}
      </IonSlides>
    </IonGrid>
  );
};

export default Section;
