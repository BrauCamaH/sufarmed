import React, { useEffect, useRef, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';

import {
  useGetCountByCategory,
  useGetCountByName,
  useGetProductsByCategory,
  useGetProductsByName,
} from '../api/products';
import { useLocation } from 'react-router';
import Layout from '../components/Layout';
import Pagination from './Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductsByCategory: React.FC = () => {
  const [page, setPage] = useState(1);
  const category = useQuery().get('category') || '';
  const { data: count } = useGetCountByCategory(parseInt(category), page);
  const {
    isLoading,
    data: products,
    isError,
    refetch,
  } = useGetProductsByCategory(parseInt(category), page);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop(0);
  };

  useEffect(() => {
    refetch();
    scrollToTop();
  }, [page]);

  return (
    <Layout contentRef={contentRef}>
      <IonHeader>
        <IonToolbar className="ion-padding-start">
          Resultado: {Math.ceil(count / 10) == page ? count % 10 : 10} {'de '}
          {count}
        </IonToolbar>
      </IonHeader>
      {isLoading ? (
        <IonSpinner />
      ) : !isError ? (
        <IonGrid fixed>
          <IonRow className="ion-margin-bottom">
            {products.map((product: Product) => (
              <IonCol key={product.id} size="8.5" size-md="4">
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
          <Pagination
            page={page}
            setPage={setPage}
            nItems={Math.ceil(count / 10)}
          />
        </IonGrid>
      ) : (
        <p>Error revise conexión a internet</p>
      )}
    </Layout>
  );
};

const Products: React.FC = () => {
  const [page, setPage] = useState(1);
  const text = useQuery().get('q') || '';
  const { data: count } = useGetCountByName(text, page);
  const { isLoading, data: products, isError, refetch } = useGetProductsByName(
    text,
    page
  );

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop(0);
  };

  useEffect(() => {
    setPage(1);
  }, [text]);

  useEffect(() => {
    refetch();
    scrollToTop();
  }, [text, page]);

  return (
    <Layout contentRef={contentRef}>
      <IonHeader>
        <IonToolbar className="ion-padding-start">
          Resultado: {Math.ceil(count / 10) == page ? count % 10 : 10} {'de '}
          {count}
        </IonToolbar>
      </IonHeader>
      {isLoading ? (
        <IonSpinner />
      ) : !isError ? (
        <IonGrid fixed>
          <IonRow>
            {products.map((product: Product) => (
              <IonCol key={product.id} size="8.5" size-md="4">
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
          <Pagination
            page={page}
            setPage={setPage}
            nItems={Math.ceil(count / 10)}
          />
        </IonGrid>
      ) : (
        <p>Error revise conexión a internet</p>
      )}
    </Layout>
  );
};

export const ProductsOrProductsByCategory = () => {
  const category = useQuery().get('category') || '';

  return category ? <ProductsByCategory /> : <Products />;
};

export default ProductsOrProductsByCategory;
