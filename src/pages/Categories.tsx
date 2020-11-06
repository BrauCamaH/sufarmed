import React from 'react';
import { IonContent, IonList, IonPage } from '@ionic/react';
import CategoryItem from '../components/Category';

import Appbar from '../components/Appbar';
import Footer from '../components/Footer';

import { Category } from '../models/Category';

const categories: Category[] = [
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
  {
    id: Date.now().toString(),
    name: 'category',
    imgUrl: 'https://picsum.photos/150/150',
  },
];

const CategoriesPage: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonList style={{ padding: '6em' }}>
          {categories?.map((category) => (
            <CategoryItem category={category} />
          ))}
        </IonList>{' '}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
