import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
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
      <IonCard className="product">
        <IonItem
          className="product__item"
          button
          lines="none"
          routerDirection="none"
          routerLink={`/product/${product.id}`}
        >
          <img
            className="product__img"
            src={product.img?.formats.small.url}
            alt="product"
          />
        </IonItem>
        <IonCardContent>
          <IonCardSubtitle>{product.name}</IonCardSubtitle>${product.price}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ProductCard;
