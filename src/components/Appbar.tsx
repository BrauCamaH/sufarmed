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
  IonImg,
  IonToolbar,
} from '@ionic/react';
import { cart } from 'ionicons/icons';

const Appbar: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonGrid color="primary">
            <IonRow class="ion-justify-content-around ion-align-items-center">
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
              <IonSearchbar
                placeholder="Buscar Productos..."
                style={{ width: 500 }}
              />
              <IonRow class="ion-justify-content-between ion-align-items-center">
                <IonButton routerLink="/login" color="secondary">
                  Iniciar Sesión
                </IonButton>
                <IonButton
                  fill="clear"
                  size="large"
                  color="secondary"
                  routerLink="/cart"
                >
                  <IonIcon icon={cart}></IonIcon>
                </IonButton>
              </IonRow>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <IonItem
                lines="none"
                color="primary"
                detail={false}
                routerLink={'/categories'}
                routerDirection="none"
              >
                <IonLabel>Categorias</IonLabel>
              </IonItem>
              <IonItem
                lines="none"
                color="primary"
                detail={false}
                routerLink={'/'}
                routerDirection="none"
              >
                <IonLabel>Historial</IonLabel>
              </IonItem>
              <IonItem
                lines="none"
                color="primary"
                detail={false}
                routerLink={'/'}
                routerDirection="none"
              >
                <IonLabel>Ayuda</IonLabel>
              </IonItem>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Appbar;
