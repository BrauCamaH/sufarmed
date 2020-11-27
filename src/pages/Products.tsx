import React, { useEffect } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import ProductCard from '../components/Product';
import Filter from '../components/Filter';
import { Product } from '../models/Product';

import {
  useGetProductsByCategory,
  useGetProductsByName,
} from '../api/products';
import { useLocation } from 'react-router';
import Layout from '../components/Layout';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products: React.FC = () => {
  const text = useQuery().get('q') || '';
  const category = useQuery().get('category') || '';
  const { isLoading, data: products, isError, refetch } = useGetProductsByName(
    text,
    1
  );
  const {
    isLoading: isLoadingCategory,
    data: productsByCategory,
  } = useGetProductsByCategory(parseInt(category), 1);

  useEffect(() => {
    refetch();
  }, [text]);

  return (
    <Layout>
      <IonHeader>
        <IonToolbar>Resultados: {} productos</IonToolbar>
      </IonHeader>
      {isLoading || isLoadingCategory ? (
        <IonSpinner />
      ) : !isError ? (
        <IonGrid fixed>
          <IonRow>
            {category
              ? products.map &&
                productsByCategory.map((product: Product) => (
                  <IonCol key={product.id} size="10" size-md="4">
                    <ProductCard product={product} />
                  </IonCol>
                ))
              : products.map &&
                products.map((product: Product) => (
                  <IonCol key={product.id} size="10" size-md="4">
                    <ProductCard product={product} />
                  </IonCol>
                ))}
          </IonRow>
        </IonGrid>
      ) : (
        <p>Error revise conexión a internet</p>
      )}
    </Layout>
  );
};

export default Products;
