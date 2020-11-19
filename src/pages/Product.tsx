import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSpinner,
  IonTitle,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useGetProductById } from '../api/products';
import { Product } from '../models/Product';

import './Products.css';

interface ProductPageProps {
  product: Product;
}

const MainContent: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonItem>
          <IonTitle color="tertiary">{product.name}</IonTitle>
          <IonTitle color="black">${product.price}</IonTitle>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeSm="auto" sizeMd="6">
              <IonCardSubtitle>{product.summary}</IonCardSubtitle>
            </IonCol>
            <IonCol size="auto">
              <IonList lines="none">
                <IonItem>Presentación: {product.presentation}</IonItem>
                <IonItem>
                  Contenido por unidad: {product.content_by_unit}
                </IonItem>
                <IonItem>Unidades: {product.total_units}</IonItem>
              </IonList>
            </IonCol>
            <IonCol size="auto">
              <IonItem>
                <IonLabel position="stacked">Cantidad</IonLabel>
                <IonInput type="number" maxlength={4} />
              </IonItem>
              <IonButton color="secondary">Comprar</IonButton>
              <IonButton color="secondary">
                <IonIcon icon={cart} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

const Description: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div>
      <IonTitle color="tertiary">Descripción</IonTitle>
      <IonItem lines="none">
        <IonCardSubtitle>
          {product.description || 'No hay descripción'}
        </IonCardSubtitle>
      </IonItem>
    </div>
  );
};

const Especifications: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle color="tertiary">Especificaciones</IonTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonList lines="none">
                <IonItem>Formula</IonItem>
                <IonItem>
                  <IonCardSubtitle>{product.formula}</IonCardSubtitle>
                </IonItem>
              </IonList>
              <IonList lines="none">
                <IonItem>Indicaciones</IonItem>
                <IonItem>
                  <IonCardSubtitle>{product.indications}</IonCardSubtitle>
                </IonItem>
              </IonList>
            </IonCol>
            <IonCol>
              <IonList lines="none">
                <IonItem>Dosís</IonItem>
                <IonItem>
                  <IonCardSubtitle>{product.dose}</IonCardSubtitle>
                </IonItem>
              </IonList>
              <IonList lines="none">
                <IonItem>Vía de administración</IonItem>
                <IonItem>
                  <IonCardSubtitle>{product.administration}</IonCardSubtitle>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

const ProductPage: React.FC = () => {
  const { id } = useParams<any>();
  const { isLoading, data: product } = useGetProductById(id);

  if (isLoading) {
    return (
      <Layout>
        <IonSpinner />
      </Layout>
    );
  } else {
    return (
      <Layout>
        {
          <>
            <IonRow className="ion-justify-content-center">
              <img
                className="product-page__img"
                src={product?.img?.url}
                alt="product"
              />
            </IonRow>
            <MainContent product={product} />
            <Description product={product} />
            <Especifications product={product} />
          </>
        }
      </Layout>
    );
  }
};

export default ProductPage;
