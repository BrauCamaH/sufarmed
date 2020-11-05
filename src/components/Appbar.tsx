import React from 'react';
import {
  IonHeader,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonMenu,
  IonList,
  IonImg,
} from '@ionic/react';
import { cart } from 'ionicons/icons';

import Slider from './Slider';

const Appbar: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonGrid>
          <IonRow class="ion-justify-content-around ion-align-items-center">
            <IonImg
              style={{ width: 200, heigth: 200 }}
              src="assets/logo-sufarmed.png"
            />
            <IonSearchbar
              placeholder="Buscar Productos..."
              style={{ width: 500 }}
            />
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <IonButton>Iniciar Sesión</IonButton>
              <IonButton fill="clear" size="large" routerLink="/cart">
                <IonIcon icon={cart}></IonIcon>
              </IonButton>
            </IonRow>
          </IonRow>
          <IonMenu></IonMenu>
          <IonList lines="none">
            <IonRow class="ion-justify-content-center">
              <IonItem detail={false} routerLink={'/'} routerDirection="none">
                <IonLabel>Categorias</IonLabel>
              </IonItem>
              <IonItem detail={false} routerLink={'/'} routerDirection="none">
                <IonLabel>Historial</IonLabel>
              </IonItem>
              <IonItem detail={false} routerLink={'/'} routerDirection="none">
                <IonLabel>Ayuda</IonLabel>
              </IonItem>
            </IonRow>
          </IonList>
        </IonGrid>
      </IonHeader>
      <Slider />
    </>
  );
};

export default Appbar;
