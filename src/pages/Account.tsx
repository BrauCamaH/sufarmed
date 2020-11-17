import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { pencil, close } from 'ionicons/icons';
import { withRouter, useLocation } from 'react-router';

import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
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
    <IonPage id="account">
      <Appbar />
      <IonContent>
        <IonToolbar>
          <IonRow className="ion-margin-start ion-margin-bottom">
            <IonItem
              button
              lines={location.pathname.startsWith('/account') ? 'full' : 'none'}
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Account);
