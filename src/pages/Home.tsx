import React from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Slider from '../components/Slider';

import './Home.css';

const Home: React.FC = () => {
  return (
    <Layout>
      <Slider />
      <Section name="Tabletas" searchId="tabs" />
      <Section name="Tabletas" searchId="tabs" />
    </Layout>
  );
};

export default Home;
