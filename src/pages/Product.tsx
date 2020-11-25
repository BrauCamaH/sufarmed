import React, { useState } from 'react';
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
  IonToast,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useGetProductById } from '../api/products';
import { Product } from '../models/Product';

import './Products.css';
import { useForm } from 'react-hook-form';

import { useUserState } from '../providers/UserProvider';
import { User } from '../models/User';
import { Order } from '../models/Order';
import {
  useCreateOrderDetail,
  useUpdateOrderDetail,
} from '../api/order-details';
import { useCartDispatch, useCartState } from '../providers/CartProvider';
import { useCreateOrder } from '../api/orders';

interface ProductPageProps {
  product: Product;
  token?: string;
  user?: User;
}

interface AddToCartProps {
  product: Product;
  token: string;
  user: User;
}

const AddtoCart: React.FC<AddToCartProps> = ({ product, token, user }) => {
  const { register, errors, handleSubmit } = useForm();
  const state = useCartState();
  const dispatch = useCartDispatch();
  const [updateOrderDetail] = useUpdateOrderDetail();
  const [createOrderDetail] = useCreateOrderDetail();
  const [createOrder] = useCreateOrder();
  const [showToast, setShowToast] = useState(false);

  const existingOrderDetail = state.cart.order_details.find(
    (item) => item.product === product.id
  );

  const handleCreateOrder = async ({ quantity }: { quantity: string }) => {
    const quantityInNumber = parseInt(quantity);

    if (state.cart.id === 0) {
      dispatch({ type: 'set-status', payload: 'isLoading' });
      const order: Order = await createOrder({ token, user: user.id });
      const orderDetail = await createOrderDetail({
        orderId: order.id,
        price: product.price,
        productId: product.id,
        token,
        quantity: quantityInNumber,
      });
      dispatch({ type: 'set-status', payload: 'isFetched' });
      dispatch({
        type: 'set-item',
        payload: { ...orderDetail, product: orderDetail.product.id },
      });
    } else if (existingOrderDetail) {
      const newQuantity = existingOrderDetail.quantity + parseInt(quantity);
      dispatch({ type: 'set-status', payload: 'isLoading' });
      await updateOrderDetail({
        id: existingOrderDetail.id,
        token,
        data: { quantity: existingOrderDetail.quantity + parseInt(quantity) },
      });
      dispatch({ type: 'set-status', payload: 'isFetched' });
      dispatch({
        type: 'update-quantity',
        payload: {
          quantity: newQuantity,
          orderDetail: existingOrderDetail,
        },
      });
    } else {
      dispatch({ type: 'set-status', payload: 'isLoading' });
      const orderDetail = await createOrderDetail({
        orderId: state.cart.id,
        price: product.price,
        productId: product.id,
        token,
        quantity: quantityInNumber,
      });
      dispatch({ type: 'set-status', payload: 'isFetched' });
      dispatch({
        type: 'set-item',
        payload: { ...orderDetail, product: orderDetail.product.id },
      });
    }
    setShowToast(true);
  };

  return (
    <>
      <IonToast
        position="top"
        color={state.status === 'isFetched' ? 'success' : 'danger'}
        isOpen={showToast}
        duration={3000}
        message={
          state.status === 'isFetched'
            ? 'Producto agregado al carrito'
            : 'A ocurrido un error'
        }
        onDidDismiss={() => {
          setShowToast(false);
        }}
        buttons={[
          {
            text: 'Aceptar',
            role: 'cancel',
          },
        ]}
      />
      <form onSubmit={handleSubmit(handleCreateOrder)}>
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
          <IonCardSubtitle>({product.stock}) disponibles</IonCardSubtitle>
        </IonItem>
        {
          <IonTitle color="danger">
            {errors.quantity && <p>Error en cantidad</p>}
          </IonTitle>
        }
        <IonButton color="secondary">Comprar</IonButton>
        <IonButton color="secondary" type="submit">
          {state.status === 'isLoading' ? (
            <IonSpinner />
          ) : (
            <IonIcon icon={cart} />
          )}
        </IonButton>
      </form>
    </>
  );
};

const MainContent: React.FC<ProductPageProps> = ({ product, token, user }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <IonCard>
      <IonToast
        position="top"
        color="danger"
        isOpen={showToast}
        duration={3000}
        message="No se ha iniciado sesión"
        onDidDismiss={() => {
          setShowToast(false);
        }}
        buttons={[
          {
            text: 'Aceptar',
            role: 'cancel',
          },
        ]}
      />
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
              {user && token ? (
                <AddtoCart product={product} token={token} user={user} />
              ) : (
                <>
                  <IonItem>
                    <IonLabel>Cantidad :</IonLabel>
                    <IonInput
                      className="ion-margin-end"
                      name="quantity"
                      type="number"
                      maxlength={4}
                    />
                    <IonCardSubtitle>
                      ({product.stock}) disponibles
                    </IonCardSubtitle>
                  </IonItem>
                  <IonButton color="secondary">Comprar</IonButton>
                  <IonButton
                    color="secondary"
                    type="submit"
                    onClick={() => {
                      setShowToast(true);
                    }}
                  >
                    <IonIcon icon={cart} />
                  </IonButton>
                </>
              )}
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
  const { isLoading, isError, data: product } = useGetProductById(id);
  const state = useUserState();

  return (
    <Layout>
      {isLoading ? (
        <IonSpinner />
      ) : !isError ? (
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
          <MainContent token={state.jwt} user={state.user} product={product} />
          <Description product={product} />
          <Especifications product={product} />
        </>
      ) : (
        <p>Error revise conexión a internet</p>
      )}
    </Layout>
  );
};

export default ProductPage;
