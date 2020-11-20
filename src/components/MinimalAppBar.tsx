import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ImageItem from './ImageItem';

interface AppBarProps {
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <ImageItem />
        <IonTitle slot="end" size="large">
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
