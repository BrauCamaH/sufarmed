import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList, IonRow } from '@ionic/react';
import { person, card, shield } from 'ionicons/icons';

import './Help.css';

interface HelpItemProps {
  title: string;
  icon: string;
  to: string;
}

const list: HelpItemProps[] = [
  {
    title: 'Configurar mi cuenta',
    icon: person,
    to: '/account-info',
  },
  {
    title: 'Compras',
    icon: card,
    to: '/shopping-info',
  },
  {
    title: 'Solución de problemas',
    icon: shield,
    to: '/contact',
  },
];

const HelpItem: React.FC<HelpItemProps> = ({ title, icon, to }) => {
  return (
    <IonItem className="help__item" lines="none" button routerLink={to}>
      <IonIcon icon={icon} className="ion-padding-end" />
      <IonLabel>
        <h1>{title}</h1>
      </IonLabel>
    </IonItem>
  );
};

const Help: React.FC = () => {
  return (
    <div>
      <h1 className="ion-margin">¿En que podemos Ayudarte?</h1>
      <IonList>
        <IonRow className="ion-justify-content-center ion-margin-top ion-margin-bottom">
          {list.map((item, index) => (
            <HelpItem
              key={index}
              title={item.title}
              icon={item.icon}
              to={item.to}
            />
          ))}
        </IonRow>
      </IonList>
    </div>
  );
};

export default Help;
