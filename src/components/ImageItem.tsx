import { IonItem } from '@ionic/react';
import * as React from 'react';

import './ImageItem.css';

const ImageItem: React.FC = () => {
  return (
    <IonItem
      lines="none"
      color="primary"
      routerLink="/home"
      routerDirection="none"
    >
      <img id="image-item" src="assets/logo-sufarmed.png" alt="sufarmed" />
    </IonItem>
  );
};

export default ImageItem;
