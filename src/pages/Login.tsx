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
            <IonTitle>Ingresa los siguientes datos para</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <form noValidate onSubmit={login}>
              <IonList>
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
                <IonItem>
                  <IonLabel position="stacked" color="primary">
                    Password
                  </IonLabel>
                  <IonInput name="password" type="password" />
                </IonItem>
              </IonList>
              <IonCol>
                <IonButton type="submit" expand="block" color="secondary">
                  Iniciar Sesión
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  fill="clear"
                  color="secondary"
                  expand="block"
                  routerLink="/signup"
                  routerAnimation={undefined}
                >
                  Registrase
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
