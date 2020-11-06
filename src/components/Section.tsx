import React from 'react';
import {
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonButton,
  IonTitle,
} from '@ionic/react';
import Product from '../components/Product';

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 0.1,
  slidesPerView: 4.5,
};

const Section: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonTitle>Section Name</IonTitle>
        <IonButton fill="clear">Ver mas</IonButton>
      </IonRow>
      <IonSlides options={slideOpts}>
        <IonSlide>
          <Product
            imgUrl="https://picsum.photos/900/300"
            name="Product"
            info="Product Info"
          />
        </IonSlide>
        <IonSlide>
          <Product
            imgUrl="https://picsum.photos/900/300"
            name="Product"
            info="Product Info"
          />
        </IonSlide>
        <IonSlide>
          <Product
            imgUrl="https://picsum.photos/900/300"
            name="Product"
            info="Product Info"
          />
        </IonSlide>{' '}
        <IonSlide>
          <Product
            imgUrl="https://picsum.photos/900/300"
            name="Product"
            info="Product Info"
          />
        </IonSlide>{' '}
        <IonSlide>
          <Product
            imgUrl="https://picsum.photos/900/300"
            name="Product"
            info="Product Info"
          />
        </IonSlide>
      </IonSlides>
    </IonGrid>
  );
};

export default Section;
