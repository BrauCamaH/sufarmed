import React, { useState } from 'react';
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
  IonModal,
} from '@ionic/react';
import {
  cart,
  menu,
  help,
  pricetag,
  calendar,
  search,
  person,
} from 'ionicons/icons';
import { withRouter, useLocation } from 'react-router';

import SearchModal from './SearchModal';
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
            routerDirection="none"
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
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const state = useUserState();

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonGrid color="primary">
            <IonRow class="ion-justify-content-between">
              <IonRow>
                <IonMenuButton>
                  <IonIcon id="drawer" icon={menu} />
                </IonMenuButton>
                <ImageItem />
              </IonRow>
              <IonRow class="ion-justify-content-between ion-align-items-center">
                <IonButton
                  fill="clear"
                  color="light"
                  onClick={() => {
                    setShowSearchbar(true);
                  }}
                >
                  <IonIcon icon={search} />
                </IonButton>
                {state.user ? (
                  <IonButton fill="clear" color="light" routerLink="/account">
                    <IonIcon icon={person} />
                  </IonButton>
                ) : (
                  <IonButton routerLink="/login" color="secondary" size="small">
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
      <IonModal
        isOpen={showSearchbar}
        onDidDismiss={() => setShowSearchbar(false)}
        swipeToClose={true}
        cssClass="session-list-filter"
      >
        <SearchModal onDismissModal={() => setShowSearchbar(false)} />
      </IonModal>
    </>
  );
};

export default withRouter(Appbar);
