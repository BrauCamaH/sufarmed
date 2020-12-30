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
  IonItem,
  IonList,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToast,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useGetProductById } from '../api/products';
import { Product } from '../models/Product';

import { useUserState } from '../providers/UserProvider';
import { User } from '../models/User';
import {
  useCreateOrderDetail,
  useUpdateOrderDetail,
} from '../api/order-details';
import { useCartDispatch, useCartState } from '../providers/CartProvider';
import { useCreateOrder } from '../api/orders';

import QuantityInput from '../components/QuantityInput';
import Spinner from '../components/loaders/Spinner';

import './Products.css';
import { formatToCurrency } from '../utils';

interface ProductPageProps {
  product: Product;
  user?: User;
}

interface AddToCartProps {
  product: Product;
  user: User;
}

const AddtoCart: React.FC<AddToCartProps> = ({ product, user }) => {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const [updateOrderDetail] = useUpdateOrderDetail();
  const [createOrderDetail] = useCreateOrderDetail();
  const [createOrder] = useCreateOrder();
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const existingOrderDetail = state.cart.order_details.find(
    (item) => item.product === product.id
  );

  const handleCreateOrder = async () => {
    if (state.cart.id === 0) {
      dispatch({ type: 'set-status', payload: 'isLoading' });
      const order: any = await createOrder({ user: user.id });
      dispatch({ type: 'set-cart', payload: order });
      const orderDetail = await createOrderDetail({
        orderId: order.id,
        price: product.price,
        productId: product.id,
        quantity,
      });
      dispatch({ type: 'set-status', payload: 'isFetched' });
      dispatch({
        type: 'set-item',
        payload: { ...orderDetail, product: orderDetail.product.id },
      });
    } else if (existingOrderDetail) {
      const newQuantity = existingOrderDetail.quantity + quantity;
      dispatch({ type: 'set-status', payload: 'isLoading' });
      const orderDetail = await updateOrderDetail({
        id: existingOrderDetail.id,
        data: { quantity: existingOrderDetail.quantity + quantity },
      });
      dispatch({ type: 'set-status', payload: 'isFetched' });
      dispatch({
        type: 'update-quantity',
        payload: {
          quantity: newQuantity,
          orderDetail: { ...orderDetail, product: orderDetail.product.id },
        },
      });
    } else {
      dispatch({ type: 'set-status', payload: 'isLoading' });
      const orderDetail = await createOrderDetail({
        orderId: state.cart.id,
        price: product.price,
        productId: product.id,
        quantity: quantity,
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
      <QuantityInput
        quantity={quantity}
        setQuantity={setQuantity}
        stock={product.stock}
      />
      <IonButton
        disabled={state.status === 'isLoading'}
        color="secondary"
        onClick={handleCreateOrder}
      >
        Agregar a carrito
        {state.status === 'isLoading' ? (
          <IonSpinner className="ion-margin-start" />
        ) : (
          <IonIcon className="ion-margin-start" icon={cart} />
        )}
      </IonButton>
    </>
  );
};

const MainContent: React.FC<ProductPageProps> = ({ product, user }) => {
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
      <IonRow class="ion-margin-top">
        <IonCol>
          <IonTitle color="tertiary">{product.name}</IonTitle>
        </IonCol>
        <IonCol>
          <IonTitle color="dark">{formatToCurrency(product.price)}</IonTitle>
        </IonCol>
      </IonRow>
      <IonCardContent>
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
              {user ? (
                <AddtoCart product={product} user={user} />
              ) : (
                <>
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                  <IonButton
                    color="secondary"
                    type="submit"
                    onClick={() => {
                      setShowToast(true);
                    }}
                  >
                    Agregar a carrito
                    <IonIcon className="ion-margin-start" icon={cart} />
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
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data: product } = useGetProductById(+id);
  const state = useUserState();

  return (
    <>
      {isLoading ? (
        <Spinner />
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
          <MainContent user={state.user} product={product} />
          <Description product={product} />
          <Especifications product={product} />
        </>
      ) : (
        <p>Error revise conexión a internet</p>
      )}
    </>
  );
};

export default ProductPage;
