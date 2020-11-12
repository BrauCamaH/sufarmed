import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from '@ionic/react';
import { person, card, shield } from 'ionicons/icons';
import Footer from '../components/Footer';
import AppBar from '../components/Appbar';

import './Help.css';

interface HelpItemProps {
  title: string;
  icon: string;
}

const list: HelpItemProps[] = [
  {
    title: 'Configurar mi cuenta',
    icon: person,
  },
  {
    title: 'Compras',
    icon: card,
  },
  {
    title: 'Solución de problemas',
    icon: shield,
  },
];

const HelpItem: React.FC<HelpItemProps> = ({ title, icon }) => {
  return (
    <IonItem className="help__item" lines="none" button routerLink="/">
      <IonIcon icon={icon} className="ion-padding-end" />
      <IonLabel>
        <h1>{title}</h1>
      </IonLabel>
    </IonItem>
  );
};

const Help: React.FC = () => {
  return (
    <IonPage id="help">
      <AppBar />
      <IonContent>
        <h1 className="ion-margin">¿En que podemos Ayudarte?</h1>
        <IonList>
          <IonRow className="ion-justify-content-center ion-margin-top ion-margin-bottom">
            {list.map((item, index) => (
              <HelpItem key={index} title={item.title} icon={item.icon} />
            ))}
          </IonRow>
        </IonList>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Help;
