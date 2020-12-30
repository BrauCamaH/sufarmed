import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonText,
  IonThumbnail,
} from '@ionic/react';
import { Product } from '../models/Product';

import './Product.css';
import { formatToCurrency } from '../utils';

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
          <IonThumbnail className="product__img">
            <img src={product.img?.formats.small.url} alt="product" />
          </IonThumbnail>
        </IonItem>
        <IonCardContent>
          <IonText class="ion-text-start" color="medium">
            <h3>{product.name}</h3>
          </IonText>
          <IonText class="ion-text-start" color="tertiary">
            <h2>
              <b> MXN {formatToCurrency(product.price)}</b>
            </h2>
          </IonText>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default ProductCard;
