import React from 'react';
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
  IonToast,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';

import Appbar from '../components/MinimalAppBar';
import { useLogin } from '../api/users';
import { useUserDispatch, useUserState } from '../providers/UserProvider';

import './Login.css';

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useUserDispatch();
  const state = useUserState();
  const [mutation, { isLoading, isError }] = useLogin();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response: any = await mutation({
        email: data.email,
        password: data.password,
      });
      dispatch({ type: 'set-user', payload: response });
    } catch (error) {
      console.log();
    }
  };

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent>
        <Appbar title="Inicio de sesión" />
        <IonToast
          position="top"
          color="danger"
          isOpen={isError}
          duration={3000}
          message="Datos incorrectos"
          buttons={[
            {
              text: 'Aceptar',
              role: 'cancel',
            },
          ]}
        />
        <IonCard className="login-form">
          <IonCardHeader>
            <IonTitle>
              Ingresa los siguientes datos para iniciar sesión
            </IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <form noValidate onSubmit={handleSubmit(handleLogin)}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked" color="primary">
                    Email
                  </IonLabel>
                  <IonInput
                    ref={register({
                      required: true,
                      maxLength: 20,
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
                    name="email"
                    type="email"
                    spellCheck={false}
                    autoCapitalize="off"
                    required
                  />
                </IonItem>
                {errors.email && (
                  <IonTitle color="danger">
                    <p>Se requiere email</p>
                  </IonTitle>
                )}
                <IonItem>
                  <IonLabel position="stacked" color="primary">
                    Contraseña
                  </IonLabel>
                  <IonInput
                    ref={register({ required: true, minLength: 6 })}
                    name="password"
                    type="password"
                  />
                </IonItem>
                {errors.password && (
                  <IonTitle color="danger">
                    <p>Se requiere contraseña</p>
                  </IonTitle>
                )}
              </IonList>
              <IonCol>
                {isLoading ? (
                  <IonButton type="submit" expand="block" color="secondary">
                    <IonSpinner />
                  </IonButton>
                ) : (
                  <IonButton type="submit" expand="block" color="secondary">
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
