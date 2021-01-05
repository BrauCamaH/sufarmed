import React from 'react';
import { IonCol, IonFooter, IonToolbar, IonGrid, IonRow } from '@ionic/react';
import { NavLink } from 'react-router-dom';

import './Footer.css';
import { useUserState } from '../providers/UserProvider';

export interface LinkProps {
  title?: boolean;
  href?: string;
  to?: string;
}

const Link: React.FC<LinkProps> = ({ to, href, title, children }) => {
  return (
    <IonRow>
      {href ? (
        <a href={href}>{children}</a>
      ) : (
        <NavLink
          className={title ? 'footer__item--title' : 'footer__item'}
          to={to || ''}
        >
          {children}
        </NavLink>
      )}
    </IonRow>
  );
};

const Footer: React.FC = () => {
  const state = useUserState();

  return (
    <IonFooter className="footer-content">
      <IonToolbar color="secondary">
        <IonGrid id="footer">
          <IonRow className="ion-margin-start">
            <IonCol>
              <Link title>Acerca de</Link>
              <Link href="https://www.sufarmed.com/">Sufarmed</Link>
            </IonCol>
            <IonCol>
              <Link title>Ayuda</Link>
              <Link to="/account-info">Configuración</Link>
              <Link to="/shopping-info">Comprar</Link>
              <Link to="/contact">Solución de Problemas</Link>
            </IonCol>
            <IonCol>
              <Link title>Redes Sociales</Link>
              <Link>Facebook</Link>
              <Link>Instagram</Link>
              <Link>Youtube</Link>
            </IonCol>
            <IonCol>
              <Link title>Mi Cuenta</Link>
              <>
                {state.user ? (
                  <>
                    <Link to="/account">Mi datos</Link>
                    <Link to="/orders">Mis compras</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">Ingresar</Link>
                    <Link to="/signup">Crear cuenta</Link>
                  </>
                )}
              </>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
