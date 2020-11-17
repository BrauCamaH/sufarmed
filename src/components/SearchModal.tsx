import React, { useEffect, useRef } from 'react';
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
  const searchRef = useRef<any>(null);

  async function focusElement(ref: any) {
    if (ref) {
      const el = await ref.getInputElement();
      el.focus();
    } else {
      console.log('focusElement got no ref');
    }
  }
  focusElement(searchRef.current);

  useEffect(() => {
    focusElement(searchRef.current);
  });

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
            ref={searchRef}
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
