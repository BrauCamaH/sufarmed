import { IonAvatar, IonLabel, IonItem, IonIcon } from '@ionic/react';
import React from 'react';
import { Category } from '../models/Category';
import { image } from 'ionicons/icons';

import './Category.css';

interface CategoryProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryProps> = ({ category }) => {
  return (
    <IonItem
      className="categories__item"
      lines="none"
      button
      routerLink={`/products?category=${category.id}`}
    >
      {category.img ? (
        <IonAvatar slot="start">
          <img src={category.img.url} alt="category" />
        </IonAvatar>
      ) : (
        <IonIcon className="ion-padding-end" icon={image} />
      )}
      <IonLabel>
        <h1>{category.name}</h1>
      </IonLabel>
    </IonItem>
  );
};

export default CategoryItem;
