import React from 'react';
import {
  IonHeader,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonImg,
  IonToolbar,
  IonMenuToggle,
  IonMenu,
  IonContent,
  IonList,
  IonMenuButton,
} from '@ionic/react';
import { cart, menu, help, pricetag, calendar, person } from 'ionicons/icons';
import { withRouter, useLocation } from 'react-router';

import Searchbar from './Searchbar';
import ImageItem from './ImageItem';
import { useUserState } from '../providers/UserProvider';

import './Appbar.css';

interface Pages {
  title: string;
  path: string;
  routerDirection?: string;
  icon: string;
}

interface MenuProps {
  menuEnabled?: boolean;
}

const routes = {
  appPages: [
    { title: 'Categorias', path: '/categories', icon: pricetag },
    { title: 'Ayuda', path: '/help', icon: help },
    { title: 'Mis compras', path: '/orders', icon: calendar },
  ],
};

export const Menu: React.FC<MenuProps> = ({ menuEnabled }) => {
  const location = useLocation();

  const renderlistItems = (list: Pages[]) => {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="root"
            className={
              location.pathname.startsWith(p.path) ? 'selected' : undefined
            }
          >
            <IonIcon id="drawer" slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  };
  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonItem
              color="primary"
              lines="none"
              routerLink="/home"
              routerDirection="root"
            >
              <IonMenuButton>
                <IonIcon icon={menu} />
              </IonMenuButton>
              <IonImg
                style={{ width: 150, heigth: 150 }}
                src="assets/logo-sufarmed.png"
              />
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonList lines="none">{renderlistItems(routes.appPages)}</IonList>
      </IonContent>
    </IonMenu>
  );
};

const Appbar: React.FC = () => {
  const state = useUserState();

  return (
    <>
      <IonHeader id="appbar">
        <IonToolbar color="primary">
          <IonGrid color="primary">
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <IonRow>
                <IonMenuButton>
                  <IonIcon id="drawer" icon={menu} />
                </IonMenuButton>
                <ImageItem />
              </IonRow>
              <Searchbar />
              <IonRow class="ion-justify-content-between ion-align-items-center">
                {state.user ? (
                  <IonButton fill="clear" color="light" routerLink="/account">
                    <IonIcon icon={person} />
                  </IonButton>
                ) : (
                  <IonButton
                    routerLink="/login"
                    routerDirection="root"
                    color="secondary"
                    size="small"
                  >
                    Iniciar Sesión
                  </IonButton>
                )}
                <IonButton fill="clear" color="light" routerLink="/cart">
                  <IonIcon icon={cart}></IonIcon>
                </IonButton>
              </IonRow>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default withRouter(Appbar);
