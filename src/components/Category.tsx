import { IonAvatar, IonLabel, IonItem } from '@ionic/react';
import React from 'react';
import { Category } from '../models/Category';

import './Category.css';

interface CategoryProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryProps> = ({ category }) => {
  return (
    <IonItem className="categories__item" lines="none" button routerLink="/">
      <IonAvatar slot="start">
        <img src={category.imgUrl} alt="category" />
      </IonAvatar>
      <IonLabel>
        <h1>{category.name}</h1>
      </IonLabel>
    </IonItem>
  );
};

export default CategoryItem;
