import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToast,
} from '@ionic/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateUser } from '../api/users';
import { User } from '../models/User';
import { useUserDispatch } from '../providers/UserProvider';

import './Login.css';

const SignUp: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useUserDispatch();
  const [signUp, { isLoading, isError }] = useCreateUser();

  const handleSignUp = async (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const { email, lastname, firstname, password } = data;

    const response: { user: User; jwt: string } = await signUp({
      name: `${firstname} ${lastname}`,
      email,
      password,
    });
    dispatch({ type: 'set-user', payload: response });
  };
  return (
    <>
      <IonToast
        position="top"
        color="danger"
        isOpen={isError}
        duration={3000}
        message="El usuario ya existe"
        buttons={[
          {
            text: 'Aceptar',
            role: 'cancel',
          },
        ]}
      />
      <IonCard className="login-form">
        <IonCardHeader>
          <IonTitle>Crear un cuenta en sufarmed</IonTitle>
        </IonCardHeader>
        <IonCardContent>
          <form noValidate onSubmit={handleSubmit(handleSignUp)}>
            <IonList>
              <IonRow>
                <IonCol>
                  <IonCardSubtitle>Datos personales</IonCardSubtitle>
                  <IonRow>
                    <IonItem>
                      <IonLabel position="stacked" color="primary">
                        Nombre
                      </IonLabel>
                      <IonInput
                        ref={register({ required: true })}
                        name="firstname"
                        type="text"
                        spellCheck={false}
                        autoCapitalize="off"
                        required
                      />
                    </IonItem>
                    {errors.firstname && (
                      <IonTitle color="danger">
                        <p>Se requiere nombre</p>
                      </IonTitle>
                    )}
                  </IonRow>
                  <IonRow>
                    <IonItem>
                      <IonLabel position="stacked" color="primary">
                        Apellido
                      </IonLabel>
                      <IonInput
                        ref={register({ required: true })}
                        name="lastname"
                        type="text"
                      />
                    </IonItem>
                    {errors.lastname && (
                      <IonTitle color="danger">
                        <p>Se requiere apellido</p>
                      </IonTitle>
                    )}
                  </IonRow>
                </IonCol>
                <IonCol>
                  <IonCardSubtitle>Datos de la cuenta</IonCardSubtitle>
                  <IonRow>
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
                  </IonRow>
                  <IonRow>
                    <IonItem>
                      <IonLabel position="stacked" color="primary">
                        Password
                      </IonLabel>
                      <IonInput
                        ref={register({ required: true, minLength: 6 })}
                        name="password"
                        type="password"
                      />
                    </IonItem>
                    {errors.password && (
                      <IonTitle color="danger">
                        <p>Contraseña invalida</p>
                      </IonTitle>
                    )}
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonList>
            <IonCol>
              <IonButton
                id="signup"
                type="submit"
                expand="block"
                color="secondary"
              >
                {isLoading ? <IonSpinner /> : 'Crear Cuenta'}
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                fill="clear"
                color="secondary"
                expand="block"
                routerLink="/login"
              >
                Iniciar sesión
              </IonButton>
            </IonCol>
          </form>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default SignUp;
