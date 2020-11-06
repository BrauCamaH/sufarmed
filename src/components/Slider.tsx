import React from 'react';
import { IonSlides, IonSlide } from '@ionic/react';

import './Slider.css';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Slider: React.FC = () => (
  <div id="slider">
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
  </div>
);

export default Slider;
