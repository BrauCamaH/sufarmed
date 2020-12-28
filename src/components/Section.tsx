import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { IonSlides, IonSlide, IonRow, IonButton, IonTitle } from '@ionic/react';

import { Product } from '../models/Product';
import { useGetProductsByName } from '../api/products';

import ProductCard from '../components/Product';
import Spinner from './loaders/Spinner';

interface SectionProps {
  name: string;
  searchId: string;
}

const Section: React.FC<SectionProps> = ({ name, searchId }) => {
  const { isLoading, isError, data: products } = useGetProductsByName(
    searchId,
    1
  );

  const isSmall = useMediaQuery({ query: '(max-width: 576px)' });
  const isMedium = useMediaQuery({ query: '(max-width: 768px)' });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error revise conexión</p>;
  return (
    <div className="ion-margin-bottom">
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
      <IonSlides
        options={{ slidesPerView: isSmall ? 1.6 : isMedium ? 3.6 : 4.6 }}
      >
        {products.map &&
          products.map((product: Product) => (
            <IonSlide key={product.id}>
              <ProductCard product={product} />
            </IonSlide>
          ))}
      </IonSlides>
    </div>
  );
};

export default Section;
