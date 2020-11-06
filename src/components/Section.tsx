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
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/300',
    name: 'Product',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/300',
    name: 'Product',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/300',
    name: 'Product',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/300',
    name: 'Product',
  },
  {
    id: Date.now().toString(),
    imgUrl: 'https://picsum.photos/200/300',
    name: 'Product',
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
