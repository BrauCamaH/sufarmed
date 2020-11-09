import React from 'react';
import {
  IonButton,
  IonChip,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSlide,
  IonSlides,
  IonToolbar,
} from '@ionic/react';
import { filter } from 'ionicons/icons';

const slideOpts = {
  initialSlide: 0,
  spaceBetween: 0,
  slidesPerView: 10.5,
};

const Filter: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonSlides options={slideOpts}>
          <IonSlide>
            <IonChip>
              <IonLabel>Default</IonLabel>
            </IonChip>
          </IonSlide>
        </IonSlides>
        <IonButton slot="end" fill="clear" size="large" color="secondary">
          <IonIcon icon={filter}></IonIcon>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default Filter;
