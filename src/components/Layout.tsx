import React from 'react';
import Appbar from './Appbar';
import Footer from './Footer';
import { IonContent, IonPage } from '@ionic/react';

import './Layout.css';

const Layout: React.FC = ({ children }) => {
  return (
    <IonPage>
      <IonContent className="layout__content">
        <Appbar />
        <div id="content">{children}</div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Layout;
