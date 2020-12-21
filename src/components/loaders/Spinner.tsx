import React from 'react';
import { IonRow, IonSpinner } from '@ionic/react';

const Spinner: React.FC = () => {
  return (
    <IonRow
      style={{ width: '100%' }}
      className="ion-justify-content-center ion-margin-top"
    >
      <IonSpinner />
    </IonRow>
  );
};

export default Spinner;
