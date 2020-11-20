import React from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  IonSlides,
  IonSlide,
  IonRow,
  IonButton,
  IonTitle,
  IonSpinner,
} from '@ionic/react';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';
import { useGetProductsByName } from '../api/products';

interface SectionProps {
  name: string;
  searchId: string;
}

const Section: React.FC<SectionProps> = ({ name, searchId }) => {
  const { isLoading, data: products } = useGetProductsByName(searchId, 1);

  const isSmall = useMediaQuery({ query: '(max-width: 576px)' });
  const isMedium = useMediaQuery({ query: '(max-width: 768px)' });

  if (isLoading) {
    return <IonSpinner />;
  } else {
    return (
      <div className="ion-margin-bottom">
        <IonRow>
          <IonTitle>{name}</IonTitle>
          {}
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
  }
};

export default Section;
