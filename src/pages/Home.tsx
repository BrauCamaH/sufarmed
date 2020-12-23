import React from 'react';
import Section from '../components/Section';
import Slider from '../components/Slider';

import './Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <Section name="Tabletas" searchId="tabs" />
    </div>
  );
};

export default Home;
