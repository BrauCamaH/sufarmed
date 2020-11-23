import React, { useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import ProductCard from '../components/Product';
import Filter from '../components/Filter';
import { Product } from '../models/Product';

import { useGetProductsByName } from '../api/products';
import { useLocation } from 'react-router';
import Layout from '../components/Layout';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products: React.FC = () => {
  const text = useQuery().get('q') || '';
  const { isLoading, data: products, isError, refetch } = useGetProductsByName(
    text,
    1
  );

  useEffect(() => {
    refetch();
  }, [text]);

  return (
    <Layout>
      <Filter />
      {isLoading ? (
        <IonSpinner />
      ) : !isError ? (
        <IonGrid fixed>
          <IonRow>
            {products.map &&
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
