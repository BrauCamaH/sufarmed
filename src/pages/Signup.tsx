import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import Appbar from '../components/MinimalAppBar';
import { createUser } from '../api/users';
import { useUserDispatch } from '../providers/UserProvider';

import './Login.css';

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useUserDispatch();

  const handleSignUp = async (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    const response = await createUser(
      data.email,
      data.last_name,
      data.email,
      data.password
    );
    dispatch({ type: 'set-user', payload: response });
  };
  return (
    <IonPage>
      <IonContent>
        <Appbar title="Registrarse" />
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
                          ref={register}
                          name="firtsname"
                          type="text"
                          spellCheck={false}
                          autoCapitalize="off"
                          required
                        />
                      </IonItem>
                    </IonRow>
                    <IonRow>
                      <IonItem>
                        <IonLabel position="stacked" color="primary">
                          Apellido
                        </IonLabel>
                        <IonInput ref={register} name="lastname" type="text" />
                      </IonItem>
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
                          ref={register}
                          name="email"
                          type="email"
                          spellCheck={false}
                          autoCapitalize="off"
                          required
                        />
                      </IonItem>
                    </IonRow>
                    <IonRow>
                      <IonItem>
                        <IonLabel position="stacked" color="primary">
                          Password
                        </IonLabel>
                        <IonInput
                          ref={register}
                          name="password"
                          type="password"
                        />
                      </IonItem>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonList>
              <IonCol>
                <IonButton type="submit" expand="block" color="secondary">
                  Crear cuenta
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
