/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Menu } from './components/Appbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Product from './pages/Product';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane disabled contentId="main">
        <Menu menuEnabled={true} />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/products" component={Products} exact={true} />
          <Route path="/product" component={Product} exact={true} />
          <Route path="/categories" component={Categories} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/signup" component={Signup} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
