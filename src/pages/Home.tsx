import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Slider from '../components/Slider';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Slider />
        <Section />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
