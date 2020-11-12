import React from 'react';
import { IonCol, IonFooter, IonToolbar, IonGrid, IonRow } from '@ionic/react';

import './Footer.css';

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer-content">
      <IonToolbar color="secondary">
        <IonGrid id="footer">
          <IonRow>
            <IonCol>
              <IonRow>Acerca de</IonRow>
              <IonRow>Sufarmed</IonRow>
            </IonCol>
            <IonCol>
              <IonRow>Otros Sitios</IonRow>
              <IonRow>Página de la empresa</IonRow>
            </IonCol>
            <IonCol>
              <IonRow>Ayuda</IonRow>
              <IonRow>Configuración</IonRow>
              <IonRow>Comprar</IonRow>
              <IonRow>Solución de Problemas</IonRow>
            </IonCol>
            <IonCol>
              <IonRow>Redes Sociales</IonRow>
              <IonRow>Facebook</IonRow>
              <IonRow>Instagram</IonRow>
              <IonRow>Youtube</IonRow>
            </IonCol>
            <IonCol>
              <IonRow>Mi Cuenta</IonRow>
              <IonRow>Ingresar</IonRow>
              <IonRow>Crear cuenta</IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
