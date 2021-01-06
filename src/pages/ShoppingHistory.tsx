import React, { useEffect, useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonIcon,
  IonItem,
  IonList,
  IonRow,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';

import { Order } from '../models/Order';
import { chevronDown, chevronForward } from 'ionicons/icons';
import { OrderDetail } from '../models/OrderDetail';
import { useGetProductById } from '../api/products';
import Spinner from '../components/loaders/Spinner';
import { useGetShoppingCount, useQueryPaidOrders } from '../api/orders';
import { useUserState } from '../providers/UserProvider';

interface DetailItemProps {
  detail: OrderDetail;
}

const DetailItem: React.FC<DetailItemProps> = ({ detail }) => {
  const { data: product, isLoading } = useGetProductById(detail.product);

  return (
    <>
      {isLoading ? (
        <IonSpinner />
      ) : (
        <IonRow className="ion-justify-content-space-around ion-align-items-center">
          <IonAvatar className="ion-margin-end">
            <img src={product.img?.formats.thumbnail.url} alt="product" />
          </IonAvatar>
          <IonCardSubtitle className="ion-margin-end">
            {product.name}
          </IonCardSubtitle>
          <IonCardSubtitle className="ion-margin-end">
            Cantidad: {detail.quantity}
          </IonCardSubtitle>
          <IonRow>
            <IonCardSubtitle className="ion-margin-end">
              Precio: {detail.price}
            </IonCardSubtitle>
          </IonRow>
          <IonRow>
            <IonCardSubtitle>
              Total: {detail.quantity * detail.price}
            </IonCardSubtitle>
          </IonRow>
        </IonRow>
      )}
    </>
  );
};

interface HistoryDetailsItemProps {
  orderDetails: OrderDetail[];
  showDetail: boolean;
}

const HistoryDetailsItem: React.FC<HistoryDetailsItemProps> = ({
  orderDetails,
  showDetail,
}) => {
  if (!showDetail) return null;

  return (
    <IonList style={{ width: '100%' }}>
      {orderDetails.map((item) => (
        <DetailItem key={item.id} detail={item} />
      ))}
    </IonList>
  );
};

interface HistoryItemProps {
  order: Order;
}

const ChangeStatus = (status: string) => {
  if (status === 'paid') {
    return 'Pagado';
  } else if (status === 'arrived') {
    return 'Entregado';
  }
};

const HistoryItem: React.FC<HistoryItemProps> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <IonCol size="3">
        {order.updated_at && new Date(order.updated_at).toLocaleDateString()}
      </IonCol>
      <IonCol size="3">{ChangeStatus(order.status)}</IonCol>
      <IonCol size="3">{order.order_details.length}</IonCol>
      <IonCol size="1">
        <IonButton
          className="ion-margin-start"
          fill="clear"
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          <IonIcon icon={showDetails ? chevronDown : chevronForward} />
        </IonButton>
      </IonCol>

      {showDetails && (
        <HistoryDetailsItem
          showDetail={showDetails}
          orderDetails={order.order_details}
        />
      )}
    </>
  );
};

const ShoppingHistory: React.FC = () => {
  const location = useLocation();
  const userState = useUserState();
  const [page, setPage] = useState(1);
  const [shoppingHistory, setShoppingHistory] = useState<Order[]>([]);

  const { data: count, isLoading: isLoadingCount } = useGetShoppingCount(
    userState.user?.id || 0
  );

  const { refetch, isLoading, data: shopping } = useQueryPaidOrders({
    token: userState.jwt,
    userId: userState.user?.id,
    page,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (shopping) {
      setShoppingHistory((state) => [...state, ...shopping]);
    }
  }, [isLoading, page]);

  if (isLoading || isLoadingCount) return <Spinner />;
  if (!shopping) return <Spinner />;

  return (
    <div>
      <IonToolbar>
        <IonRow className="ion-margin-start ion-margin-bottom">
          <IonItem
            button
            lines={location.pathname.startsWith('/account') ? 'full' : 'none'}
            routerLink="/account"
          >
            <h1
              className={
                location.pathname.startsWith('/account')
                  ? 'account_item--selected'
                  : undefined
              }
            >
              Mi Cuenta
            </h1>
          </IonItem>
          <IonItem
            button
            lines={location.pathname.startsWith('/orders') ? 'full' : 'none'}
            routerLink="/orders"
          >
            <h1
              className={
                location.pathname.startsWith('/orders')
                  ? 'account_item--selected'
                  : undefined
              }
            >
              Mis Compras
            </h1>
          </IonItem>
        </IonRow>
      </IonToolbar>

      <div className="ion-margin">
        <IonRow class="header-row">
          <IonCol size="3">Fecha</IonCol>
          <IonCol size="3">Estado</IonCol>
          <IonCol size="3">Productos</IonCol>
          <IonCol size="1"> </IonCol>
        </IonRow>
        <IonRow>
          {shoppingHistory.map((order: Order) => (
            <HistoryItem key={order.id} order={order} />
          ))}
        </IonRow>
        <IonRow
          style={{ width: '100%' }}
          className="ion-justify-content-center"
        >
          {count ? (
            count > page * 10 ? (
              <IonButton
                color="secondary"
                onClick={() => {
                  setPage((n) => n + 1);
                }}
              >
                Mostrar más
              </IonButton>
            ) : null
          ) : null}
        </IonRow>
      </div>
    </div>
  );
};

export default ShoppingHistory;
