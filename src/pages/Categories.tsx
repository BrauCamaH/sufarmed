import React from 'react';
import { IonList, IonRow, IonSpinner, IonTitle } from '@ionic/react';
import CategoryItem from '../components/Category';

import Layout from '../components/Layout';

import { Category } from '../models/Category';
import { useQueryCategories } from '../api/categories';

import './Categories.css';

const CategoriesPage: React.FC = () => {
  const { isLoading, isError, data: categories } = useQueryCategories();

  return (
    <Layout>
      <IonList className="categories__list">
        <IonRow className="ion-justify-content-center">
          {isLoading ? (
            <IonSpinner name="crescent" />
          ) : isError ? (
            <IonTitle>Error revise la conexión a internet</IonTitle>
          ) : (
            categories.map((category: Category) => (
              <CategoryItem key={category.id} category={category} />
            ))
          )}
        </IonRow>
      </IonList>
    </Layout>
  );
};

export default CategoriesPage;
