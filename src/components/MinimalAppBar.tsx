import { IonHeader, IonImg, IonItem, IonToolbar } from '@ionic/react';
import React from 'react';

const AppBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonItem
          routerLink="/home"
          lines="none"
          color="ligth"
          routerDirection="root"
        >
          <IonImg
            style={{ width: 200, heigth: 200 }}
            src="assets/logo-sufarmed.png"
          />
        </IonItem>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
