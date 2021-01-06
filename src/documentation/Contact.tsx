import { IonCard, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { logoWhatsapp, newspaper } from 'ionicons/icons';
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="ion-margin ion-padding">
      <h1>Contacto</h1>
      <h5 className="ion-margin-bottom">
        Puedes preguntar lo que quieras en las siguientes fuentes:
      </h5>
      <IonCard>
        <a href="https://www.sufarmed.com/contact">
          <IonItem button>
            <IonIcon className="ion-margin-end" icon={newspaper} />
            <IonLabel>Página de contacto</IonLabel>
          </IonItem>
        </a>
        <a href="https://wa.link/4nik78">
          <IonItem button>
            <IonIcon className="ion-margin-end" icon={logoWhatsapp} />
            <IonLabel>WhatsApp 477 754-32-34</IonLabel>
          </IonItem>
        </a>
      </IonCard>
    </div>
  );
};
