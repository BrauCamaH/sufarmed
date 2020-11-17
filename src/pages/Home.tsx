import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
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
        <Slider />
        <Section />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
