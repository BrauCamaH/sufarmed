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
import Cart from './pages/Cart';
import Account from './pages/Account';
import Help from './pages/Help';

import { CartProvider } from './providers/CartProvider';
import { useUserState } from './providers/UserProvider';
import Checkout from './pages/Checkout';
import ShoppingHistory from './pages/ShoppingHistory';

const UnAuthApp: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane disabled contentId="main">
        <Menu menuEnabled={true} />
        <IonRouterOutlet id="main">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/products" component={Products} exact={true} />
          <Route path="/product/:id" component={Product} exact={true} />
          <Route path="/categories" component={Categories} exact={true} />
          <Route path="/help" component={Help} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/signup" component={Signup} exact={true} />

          <Route exact path="/cart" render={() => <Redirect to="/login" />} />
          <Route exact path="/orders" render={() => <Redirect to="/login" />} />
          <Route
            exact
            path="/checkout"
            render={() => <Redirect to="/login" />}
          />
          <Route
            exact
            path="/account"
            render={() => <Redirect to="/login" />}
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

const AuthApp: React.FC = () => (
  <CartProvider>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane disabled contentId="main">
          <Menu menuEnabled={true} />
          <IonRouterOutlet id="main">
            <Route path="/home" component={Home} exact={true} />
            <Route path="/products" component={Products} exact={true} />
            <Route path="/product/:id" component={Product} exact={true} />
            <Route path="/categories" component={Categories} exact={true} />
            <Route path="/cart" component={Cart} exact={true} />
            <Route path="/account" component={Account} exact={true} />
            <Route path="/orders" component={ShoppingHistory} exact={true} />
            <Route path="/help" component={Help} exact={true} />
            <Route path="/checkout" component={Checkout} exact={true} />
            <Route exact path="/login" render={() => <Redirect to="/home" />} />
            <Route
              exact
              path="/signup"
              render={() => <Redirect to="/home" />}
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </CartProvider>
);

const AuthOrDefault: React.FC = () => {
  const state = useUserState();

  return state.user ? <AuthApp /> : <UnAuthApp />;
};

export default AuthOrDefault;
