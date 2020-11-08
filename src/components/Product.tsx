import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonImg,
  IonItem,
} from '@ionic/react';
import { Product } from '../models/Product';

import './Product.css';

export interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div id="productCard">
      <IonItem button lines="none">
        <IonCard className="product">
          <IonImg className="product__img" src={product.imgUrl} />
          <IonCardContent>
            <IonCardSubtitle>{product.name}</IonCardSubtitle>
            {product.summary}
          </IonCardContent>
        </IonCard>
      </IonItem>
    </div>
  );
};

export default ProductCard;
