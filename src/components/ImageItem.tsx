import { IonItem } from '@ionic/react';
import * as React from 'react';

import './ImageItem.css';

const ImageItem: React.FC = () => {
  return (
    <IonItem
      id="image-item"
      lines="none"
      color="primary"
      routerLink="/home"
      routerDirection="none"
    >
      <img src="assets/logo-sufarmed.png" alt="sufarmed" />
    </IonItem>
  );
};

export default ImageItem;
