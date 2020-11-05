import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from '@ionic/react';

export interface ProductProps {
  imgUrl: string;
  name: string;
  info: string;
}

const Product: React.FC<ProductProps> = ({ imgUrl, name, info }) => {
  return (
    <IonCard>
      <IonImg style={{ width: 300 }} className="slide-image" src={imgUrl} />
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{info}</IonCardContent>
    </IonCard>
  );
};

export default Product;
