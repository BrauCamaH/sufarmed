import React from 'react';
import { IonContent, IonList, IonPage, IonRow } from '@ionic/react';
import CategoryItem from '../components/Category';

import Appbar from '../components/Appbar';
import Footer from '../components/Footer';

import { Category } from '../models/Category';

import './Categories.css';

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
        <IonList className="categories__list">
          <IonRow className="ion-justify-content-center">
            {categories?.map((category) => (
              <CategoryItem category={category} />
            ))}
          </IonRow>
        </IonList>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default CategoriesPage;
