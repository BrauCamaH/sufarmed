import React from 'react';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

export interface SearhModalProps {
  onDismissModal: () => void;
}

const SearhModal: React.FC<SearhModalProps> = ({ onDismissModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButton
            slot="start"
            fill="clear"
            color="light"
            onClick={onDismissModal}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonSearchbar
            placeholder="Buscar productos..."
            type="search"
            onEmptied={() => {
              alert('hello');
            }}
          />
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default SearhModal;
