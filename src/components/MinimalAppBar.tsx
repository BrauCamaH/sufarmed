import { IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface AppBarProps {
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <NavLink to="home">
          <IonImg
            style={{ width: 150, heigth: 150 }}
            src="assets/logo-sufarmed.png"
          />
        </NavLink>
        <IonTitle slot="end" size="large">
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppBar;
