import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './ImageItem.css';

const ImageItem: React.FC = () => {
  return (
    <NavLink to="/home">
      <img id="image-item" src="assets/logo-sufarmed.png" alt="sufarmed" />
    </NavLink>
  );
};

export default ImageItem;
