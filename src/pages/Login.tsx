import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToast,
} from '@ionic/react';
import { useForm } from 'react-hook-form';

import { useLogin } from '../api/users';
import { useUserDispatch } from '../providers/UserProvider';

import './Login.css';
import { User } from '../models/User';

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useUserDispatch();
  const [login, { isLoading, isError }] = useLogin();

  const handleLogin = async (data: { email: string; password: string }) => {
    const response: { user: User; jwt: string } = await login({
      email: data.email,
      password: data.password,
    });
    dispatch({ type: 'set-user', payload: response });
  };

  return (
    <div>
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
          <IonTitle>Ingresa los siguientes datos para iniciar sesión</IonTitle>
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
              <IonButton
                id="login"
                disabled={isLoading}
                type="submit"
                expand="block"
                color="secondary"
              >
                {isLoading ? <IonSpinner /> : 'Iniciar Sesión'}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                id="signup"
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
    </div>
  );
};

export default Login;
