import React from 'react';
import {
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonButton,
  IonTitle,
  IonSpinner,
} from '@ionic/react';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';
import { useGetProductsByName } from '../api/products';

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 0,
  slidesPerView: 1.8,
};

interface SectionProps {
  name: string;
  searchId: string;
}

const Section: React.FC<SectionProps> = ({ name, searchId }) => {
  const { isLoading, data: products } = useGetProductsByName(searchId, 1);

  if (isLoading) {
    return <IonSpinner />;
  } else {
    return (
      <IonGrid>
        <IonRow>
          <IonTitle>{name}</IonTitle>
          <IonButton
            fill="clear"
            routerLink={`/products?q=${searchId}`}
            routerDirection="root"
          >
            Ver más
          </IonButton>
        </IonRow>
        <IonSlides options={slideOpts}>
          {products.map &&
            products.map((product: Product) => (
              <IonSlide key={product.id}>
                <ProductCard product={product} />
              </IonSlide>
            ))}
        </IonSlides>
      </IonGrid>
    );
  }
};

export default Section;
