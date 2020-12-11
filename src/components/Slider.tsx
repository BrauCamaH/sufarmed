import React from 'react';
import { IonSlides, IonSlide, IonThumbnail } from '@ionic/react';

import './Slider.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Multimedia } from '../models/Multimedia';

interface HomeSlides {
  id: number;
  imgs: Multimedia[];
}

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
};

const useGetSliderImages = () => {
  return useQuery<HomeSlides>('home-slides', async () => {
    const { data } = await axios.get('/home-slides');
    return data;
  });
};

const Slider: React.FC = () => {
  const { data: slides, isLoading, isError } = useGetSliderImages();

  return (
    <div id="slider">
      {isLoading ? (
        <IonThumbnail />
      ) : !isError ? (
        <IonSlides pager options={slideOpts}>
          {slides?.imgs.map((img: Multimedia) => (
            <IonSlide key={img.name} className="slide-image">
              <img src={img.url} alt="slider img" className="slide-image" />
            </IonSlide>
          ))}
        </IonSlides>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
};

export default Slider;
