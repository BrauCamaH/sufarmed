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
  IonBadge,
  IonPopover,
} from '@ionic/react';
import {
  cart,
  menu,
  help,
  pricetag,
  calendar,
  person,
  personOutline,
  logOut,
} from 'ionicons/icons';
import { withRouter, useLocation } from 'react-router';

import Searchbar from './Searchbar';
import ImageItem from './ImageItem';
import { useUserDispatch, useUserState } from '../providers/UserProvider';

import './Appbar.css';
import { useCartState } from '../providers/CartProvider';

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

const AuthAppbar: React.FC = () => {
  const dispatch = useUserDispatch();
  const state = useCartState();
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

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
              <IonRow class="ion-justify-content-between ion-align-items-center">
                <IonPopover
                  isOpen={showPopover.open}
                  showBackdrop={false}
                  event={showPopover.event}
                  onDidDismiss={(e) =>
                    setShowPopover({ open: false, event: undefined })
                  }
                >
                  <IonList lines="none">
                    <IonItem
                      button
                      routerLink="/account"
                      onClick={() => {
                        setShowPopover({ open: false, event: undefined });
                      }}
                    >
                      <IonIcon
                        className="ion-margin-end"
                        icon={personOutline}
                      />
                      <IonLabel>Mi cuenta </IonLabel>
                    </IonItem>
                    <IonItem
                      button
                      onClick={() => {
                        dispatch({ type: 'sign-out' });
                      }}
                    >
                      <IonIcon className="ion-margin-end" icon={logOut} />
                      <IonLabel>Salir </IonLabel>
                    </IonItem>
                  </IonList>
                </IonPopover>
                <IonButton
                  fill="clear"
                  color="light"
                  onClick={(e) =>
                    setShowPopover({ open: true, event: e.nativeEvent })
                  }
                >
                  <IonIcon icon={person} />
                </IonButton>
                <IonButton fill="clear" color="light" routerLink="/cart">
                  <IonIcon icon={cart} />
                  <IonBadge>
                    {state.cart ? state.cart.order_details.length : ''}
                  </IonBadge>
                </IonButton>
              </IonRow>
            </IonRow>
            <Searchbar />
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

const UnAuthAppbar: React.FC = () => {
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
              <IonRow class="ion-justify-content-between ion-align-items-center">
                <IonButton
                  className="ion-margin-start"
                  routerLink="/login"
                  routerDirection="root"
                  color="secondary"
                  size="small"
                >
                  Iniciar Sesión
                </IonButton>

                <IonButton fill="clear" color="light" routerLink="/cart">
                  <IonIcon icon={cart} />
                </IonButton>
              </IonRow>
            </IonRow>
            <Searchbar />
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

const Appbar: React.FC = () => {
  const state = useUserState();
  return state.user ? <AuthAppbar /> : <UnAuthAppbar />;
};

export default withRouter(Appbar);
