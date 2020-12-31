import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonCard,
  IonIcon,
  IonCardTitle,
  IonButton,
  IonCardContent,
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
import Pagination from './Pagination';
import Spinner from '../components/loaders/Spinner';
import { search } from 'ionicons/icons';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NotFound: React.FC = () => {
  return (
    <IonCard class="ion-margin-top">
      <IonCardContent>
        <IonRow class="ion-align-items-center ion-justify-content-center">
          <IonButton color="warning" fill="clear" disabled>
            <IonIcon icon={search} />
          </IonButton>
          <IonCardTitle class="ion-margin-start">
            No exiten productos que coincidan con la búsqueda
          </IonCardTitle>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
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

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error revise conexión a internet</p>;

  if (products.length === 0) return <NotFound />;

  return (
    <div>
      <IonHeader>
        <IonToolbar className="ion-padding-start">
          Resultado: {Math.ceil(count / 10) === page ? count % 10 : 10} {'de '}
          {count}
        </IonToolbar>
      </IonHeader>

      <IonGrid fixed>
        <IonRow className="ion-margin-bottom">
          {products.map((product: Product) => (
            <IonCol
              class="ion-margin-bottom"
              key={product.id}
              size="8"
              sizeLg="3"
              sizeMd="3.8"
              sizeSm="5.9"
            >
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
    </div>
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

  useEffect(() => {
    setPage(1);
  }, [text, refetch]);

  useEffect(() => {
    refetch();
  }, [text, page, refetch]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error revise conexión a internet</p>;

  if (products.length === 0) return <NotFound />;

  return (
    <div>
      <IonHeader>
        <IonToolbar className="ion-padding-start">
          Resultado: {Math.ceil(count / 10) === page ? count % 10 : 10} {'de '}
          {count}
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <IonRow>
          {products.map((product: Product) => (
            <IonCol
              class="ion-margin-bottom"
              key={product.id}
              size="8"
              sizeLg="3"
              sizeMd="3.8"
              sizeSm="5.9"
            >
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
    </div>
  );
};

export const ProductsOrProductsByCategory = () => {
  const category = useQuery().get('category') || '';

  return category ? <ProductsByCategory /> : <Products />;
};

export default ProductsOrProductsByCategory;
