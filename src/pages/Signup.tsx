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
import Appbar from '../components/MinimalAppBar';

import './Login.css';

const login = (e: React.FormEvent) => {
  e.preventDefault();
};

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Appbar />
        <IonCard className="login-form">
          <IonCardHeader>
            <IonTitle>Crear un cuenta en sufarmed</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <form noValidate onSubmit={login}>
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
                        <IonInput name="lastname" type="text" />
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
                        <IonInput name="password" type="password" />
                      </IonItem>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonList>
              <IonCol>
                <IonButton type="submit" expand="block">
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
