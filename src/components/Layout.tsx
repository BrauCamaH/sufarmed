import React from 'react';
import Appbar from './Appbar';
import Footer from './Footer';
import { IonContent, IonPage } from '@ionic/react';

import './Layout.css';

interface LayoutProps {
  contentRef?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, contentRef }) => {
  return (
    <IonPage>
      <IonContent
        ref={contentRef}
        className="layout__content"
        scrollEvents={true}
      >
        <Appbar />
        <div id="content">{children}</div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Layout;
