import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';

import Appbar from '../components/MinimalAppBar';
import { login } from '../api/users';
import { useUserDispatch, useUserState } from '../providers/UserProvider';

import './Login.css';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useUserDispatch();
  const state = useUserState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    const response = await login(data.email, data.password);
    dispatch({ type: 'set-user', payload: response });
  };

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent>
        <Appbar title="Inicio de sesión" />
        <IonCard className="login-form">
          <IonCardHeader>
            <IonTitle>Ingresa los siguientes datos para</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <form noValidate onSubmit={handleSubmit(handleLogin)}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked" color="primary">
                    Email
                  </IonLabel>
                  <IonInput
                    ref={register}
                    name="email"
                    type="email"
                    spellCheck={false}
                    autoCapitalize="off"
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked" color="primary">
                    Password
                  </IonLabel>
                  <IonInput ref={register} name="password" type="password" />
                </IonItem>
              </IonList>
              <IonCol>
                {loading ? (
                  <IonButton type="submit" expand="block" color="secondary">
                    <IonSpinner />
                  </IonButton>
                ) : (
                  <IonButton
                    type="submit"
                    expand="block"
                    color="secondary"
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    Iniciar Sesión
                  </IonButton>
                )}
              </IonCol>
              <IonCol>
                <IonButton
                  fill="clear"
                  color="secondary"
                  expand="block"
                  routerLink="/signup"
                  routerAnimation={undefined}
                >
                  Registrarse
                </IonButton>
              </IonCol>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Login);
