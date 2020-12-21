import React from 'react';
import { IonList, IonRow, IonTitle } from '@ionic/react';
import CategoryItem from '../components/Category';

import Layout from '../components/Layout';

import { Category } from '../models/Category';
import { useQueryCategories } from '../api/categories';

import './Categories.css';
import Spinner from '../components/loaders/Spinner';

const CategoriesPage: React.FC = () => {
  const { isLoading, isError, data: categories } = useQueryCategories();

  return (
    <Layout>
      <IonList>
        <IonRow className="ion-justify-content-center">
          {isLoading ? (
            <Spinner />
          ) : !isError ? (
            categories.map((category: Category) => (
              <CategoryItem key={category.id} category={category} />
            ))
          ) : (
            <IonTitle>Error revise la conexión a internet</IonTitle>
          )}
        </IonRow>
      </IonList>
    </Layout>
  );
};

export default CategoriesPage;
