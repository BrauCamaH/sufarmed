import React, { FormEvent, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { pencil, close } from 'ionicons/icons';
import { useLocation } from 'react-router';

import { useUserDispatch, useUserState } from '../providers/UserProvider';

import './Account.css';
import AddressList from '../components/AddressList';
import { useUpdateUser } from '../api/users';

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
  valueToEdit: string;
}

const AccountItem: React.FC<AccountItemProps> = ({
  fieldName,
  valueToEdit,
  type = 'text',
  value = '',
}) => {
  const userState = useUserState();
  const dispatch = useUserDispatch();
  const [updateUser, { isLoading }] = useUpdateUser();
  const [editField, setEditField] = useState<boolean>(false);
  const [error, setError] = useState<{ message?: string }>({});

  const [fieldValue, setFieldValue] = useState<string>();
  const [confirmFieldValue, setConfirmFieldValue] = useState<string>();

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fieldValue)
      setError({ message: 'Se debe ingresar un valor en ' + fieldName });
    if (!confirmFieldValue)
      setError({ message: 'Se debe confirmar ' + fieldName });
    if (fieldValue !== confirmFieldValue)
      setError({ message: 'El valor de confirmación es diferente' });

    if (!error.message) {
      if (userState.user) {
        const user = await updateUser({
          userId: userState.user.id,
          req: { [valueToEdit]: fieldValue },
        });

        if (user) {
          dispatch({ type: 'update-user', payload: user });
        }
        setEditField(false);
      }
    }
  };

  return (
    <>
      <IonToast
        position="middle"
        color="danger"
        isOpen={error.message !== undefined}
        duration={3000}
        message={error.message}
        buttons={[
          {
            text: 'Aceptar',
            role: 'cancel',
          },
        ]}
      />
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
        <form onSubmit={handleEdit}>
          <IonToolbar color="primary">
            <IonTitle slot="start">
              Modificar {fieldName}: {value}
            </IonTitle>
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
          <IonItem>
            <IonLabel position="floating">{`Ingresa tu ${fieldName}`}</IonLabel>
            <IonInput
              name="field"
              type={type}
              onIonChange={(e) => {
                setFieldValue(e.detail.value!);
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{`Repite tu ${fieldName}`}</IonLabel>
            <IonInput
              name="confirmField"
              type={type}
              onIonChange={(e) => setConfirmFieldValue(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" type="submit" color="secondary">
            {isLoading ? <IonSpinner /> : 'Aceptar'}
          </IonButton>
        </form>
      </IonModal>
    </>
  );
};

const Account: React.FC = () => {
  const location = useLocation();
  const state = useUserState();

  return (
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
            <AccountItem
              valueToEdit="email"
              fieldName="E-mail"
              value={state.user?.email}
            />
            <AccountItem
              valueToEdit="password"
              fieldName="Contraseña"
              type="password"
            />
          </IonCol>
        </IonGrid>
        <IonGrid className="ion-justify-content-center account__list">
          <IonTitle>Datos Personales</IonTitle>
          <IonCol>
            <AccountItem
              valueToEdit="name"
              fieldName="Nombre"
              value={state.user?.name}
            />
            <AccountItem
              valueToEdit="cellphone"
              fieldName="Telefono"
              type="tel"
              value={state.user?.cellphone}
            />
          </IonCol>
        </IonGrid>
        <IonGrid className="ion-justify-content-center account__list">
          <IonTitle>Direcciones</IonTitle>
          <IonCol>
            <AddressList />
          </IonCol>
        </IonGrid>
      </IonGrid>
    </div>
  );
};

export default Account;
