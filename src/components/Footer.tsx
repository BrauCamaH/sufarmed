import React from 'react';
import {
  IonCol,
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonText,
} from '@ionic/react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

export interface LinkProps {
  title?: boolean;
  href?: string;
  to?: string;
}

const Link: React.FC<LinkProps> = ({ to, href, title, children }) => {
  return (
    <IonRow>
      {href ? (
        <a href={href}>children</a>
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
  return (
    <IonFooter className="footer-content">
      <IonToolbar color="secondary">
        <IonGrid id="footer">
          <IonRow>
            <IonCol>
              <Link title>Acerca de</Link>
              <Link>Sufarmed</Link>
            </IonCol>
            <IonCol>
              <Link title>Ayuda</Link>
              <Link to="/account">Configuración</Link>
              <Link>Comprar</Link>
              <Link to="/help">Solución de Problemas</Link>
            </IonCol>
            <IonCol>
              <Link title>Redes Sociales</Link>
              <Link>Facebook</Link>
              <Link>Instagram</Link>
              <Link>Youtube</Link>
            </IonCol>
            <IonCol>
              <Link title>Mi Cuenta</Link>
              <Link to="/login">Ingresar</Link>
              <Link to="/signup">Crear cuenta</Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
