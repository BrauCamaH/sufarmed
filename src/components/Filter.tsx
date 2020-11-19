import React from 'react';
import { IonButton, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { filter } from 'ionicons/icons';

const Filter: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButton slot="end" fill="clear" size="large" color="secondary">
          <IonIcon icon={filter}></IonIcon>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default Filter;
