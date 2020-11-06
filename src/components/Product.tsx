import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from '@ionic/react';
import { Product } from '../models/Product';

export interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <IonCard>
      <IonImg
        style={{ width: 300 }}
        className="slide-image"
        src={product.imgUrl}
      />
      <IonCardHeader>
        <IonCardTitle>{product.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{product.summary}</IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
