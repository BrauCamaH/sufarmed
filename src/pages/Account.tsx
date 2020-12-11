import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { pencil, close } from 'ionicons/icons';
import { withRouter, useLocation } from 'react-router';

import Layout from '../components/Layout';
import { useUserState } from '../providers/UserProvider';

import './Account.css';

interface AccountItemProps {
  fieldName: string;
  type?:
    | 'number'
    | 'time'
    | 'text'
    | 'date'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
    | 'month'
    | 'datetime-local'
    | undefined;
  value?: string;
}

const AccountItem: React.FC<AccountItemProps> = ({
  fieldName,
  type = 'text',
  value = '',
}) => {
  const [editField, setEditField] = useState<boolean>(false);

  return (
    <>
      <IonCard className="account__item">
        <IonCardContent>
          <IonRow>
            <IonToolbar>
              <IonCol slot="start">
                <IonCardSubtitle className="ion-padding-start">
                  {fieldName}
                </IonCardSubtitle>
              </IonCol>
              <IonCol>
                <IonItem disabled>
                  <IonInput type={type} value={value} />
                </IonItem>
              </IonCol>
              <IonCol slot="end">
                <IonButton
                  fill="clear"
                  color="secondary"
                  onClick={() => {
                    setEditField(true);
                  }}
                >
                  <IonIcon icon={pencil} />
                </IonButton>
              </IonCol>
            </IonToolbar>
          </IonRow>
        </IonCardContent>
      </IonCard>
      <IonModal isOpen={editField}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle slot="start">Modificar {fieldName}</IonTitle>
            <IonButton
              slot="end"
              fill="clear"
              color="light"
              onClick={() => {
                setEditField(false);
              }}
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonToolbar>
          <IonCard>
            <IonItem>
              <IonLabel position="stacked">{`Ingresa tu ${fieldName}`}</IonLabel>
              <IonInput type={type} value={value} />
            </IonItem>
          </IonCard>
          <IonCard>
            <IonItem>
              <IonLabel position="stacked">{`Repite tu ${fieldName}`}</IonLabel>
              <IonInput type={type} />
            </IonItem>
          </IonCard>
        </IonHeader>
        <IonButton>Aceptar</IonButton>
      </IonModal>
    </>
  );
};

const Account: React.FC = () => {
  const location = useLocation();
  const state = useUserState();

  return (
    <Layout>
      <div id="account">
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
        <IonGrid>
          <IonGrid className="ion-justify-content-center account__list">
            <IonTitle>Datos de la Cuenta</IonTitle>
            <IonCol>
              <AccountItem fieldName="E-mail" value={state.user?.email} />
              <AccountItem fieldName="Contraseña" type="password" value="" />
            </IonCol>
          </IonGrid>
          <IonGrid className="ion-justify-content-center account__list">
            <IonTitle>Datos Personales</IonTitle>
            <IonCol>
              <AccountItem fieldName="Nombre" value={state.user?.name} />
              <AccountItem
                fieldName="Telefono"
                type="tel"
                value={state.user?.cellphone}
              />
            </IonCol>
          </IonGrid>
        </IonGrid>
      </div>
    </Layout>
  );
};

export default withRouter(Account);
