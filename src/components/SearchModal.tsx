import React from 'react';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';

export interface SearhModalProps {
  onDismissModal: () => void;
}

const SearhModal: React.FC<SearhModalProps> = ({ onDismissModal }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonSearchbar />
          <IonButton
            slot="end"
            fill="clear"
            color="light"
            onClick={onDismissModal}
          >
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default SearhModal;
