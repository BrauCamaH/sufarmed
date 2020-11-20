import React, { useEffect } from 'react';
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
import { useForm } from 'react-hook-form';

interface ProductPageProps {
  product: Product;
}

const MainContent: React.FC<ProductPageProps> = ({ product }) => {
  const { register, errors, handleSubmit } = useForm();

  return (
    <IonCard>
      <IonCardContent>
        <IonItem>
          <IonRow>
            <IonCol>
              <IonTitle color="tertiary">{product.name}</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle color="dark">${product.price}</IonTitle>
            </IonCol>
          </IonRow>
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
              <form
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                })}
              >
                <IonItem>
                  <IonLabel>Cantidad :</IonLabel>
                  <IonInput
                    ref={register({
                      required: true,
                      max: product.stock,
                      min: 1,
                    })}
                    className="ion-margin-end"
                    name="quantity"
                    type="number"
                    maxlength={4}
                  />
                  <IonCardSubtitle>
                    ({product.stock}) disponibles
                  </IonCardSubtitle>
                </IonItem>
                {
                  <IonTitle color="danger">
                    {errors.quantity && <p>Error en cantidad</p>}
                  </IonTitle>
                }
                <IonButton color="secondary" type="submit">
                  Comprar
                </IonButton>
                <IonButton color="secondary">
                  <IonIcon icon={cart} />
                </IonButton>
              </form>
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
  const { isLoading, data: product, refetch } = useGetProductById(id);

  useEffect(() => {
    (!product || !product.image) && refetch();
  }, []);

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
              {product.img && (
                <img
                  className="product-page__img"
                  src={product.img.formats.medium.url}
                  alt="product"
                />
              )}
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
