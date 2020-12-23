import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Appbar from '../components/MinimalAppBar';

export const MinimalLayout: React.FC = ({ children }) => {
  return (
    <IonPage>
      <IonContent>
        <Appbar title="Inicio de sesión" />
        {children}
      </IonContent>
    </IonPage>
  );
};
