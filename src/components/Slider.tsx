import React from 'react';
import { IonSlides, IonSlide, IonContent } from '@ionic/react';

import './Slider.css';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const Slider: React.FC = () => (
  <IonContent id="slider">
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide className="slide-image">
        <img
          src="https://picsum.photos/900/300"
          alt="slider img"
          className="slide-image"
        />
      </IonSlide>
      <IonSlide className="slide-image">
        <img
          src="https://picsum.photos/900/300"
          alt="slider img"
          className="slide-image"
        />
      </IonSlide>
      <IonSlide className="slide-image">
        <img
          src="https://picsum.photos/900/300"
          alt="slider img"
          className="slide-image"
        />
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default Slider;
