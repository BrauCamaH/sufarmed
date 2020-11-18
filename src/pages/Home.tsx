import React from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Slider from '../components/Slider';
import './Home.css';

const Home: React.FC = () => {
  return (
    <Layout>
      <Slider />
      <Section />
    </Layout>
  );
};

export default Home;
