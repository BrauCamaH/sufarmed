import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Menu } from './components/Appbar';

import { CartProvider } from './providers/CartProvider';
import { useUserState } from './providers/UserProvider';
import { ShoppingProvider } from './providers/ShoppingProvider';

import ShoppingHistory from './pages/ShoppingHistory';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Help from './pages/Help';
import AddAddress from './pages/AddAddress';
import Checkout from './pages/Checkout';
import EditAddress from './pages/EditAddress';

const AuthOrDefault: React.FC = () => {
  const state = useUserState();

  const isAuthed = state.user;

  return (
    <CartProvider>
      <ShoppingProvider>
        <IonReactRouter>
          <IonApp>
            <IonSplitPane disabled contentId="main">
              <Menu menuEnabled={true} />
              <IonRouterOutlet id="main">
                {
                  <>
                    <Layout>
                      <Route path="/home" component={Home} exact={true} />
                      <Route
                        path="/products"
                        component={Products}
                        exact={true}
                      />
                      <Route
                        path="/product/:id"
                        component={Product}
                        exact={true}
                      />
                      <Route
                        path="/categories"
                        component={Categories}
                        exact={true}
                      />
                      <Route path="/help" component={Help} exact={true} />

                      <Route
                        exact
                        path="/cart"
                        render={() => {
                          return isAuthed ? <Cart /> : <Redirect to="login" />;
                        }}
                      />
                      <Route
                        exact
                        path="/account"
                        render={() => {
                          return isAuthed ? (
                            <Account />
                          ) : (
                            <Redirect to="login" />
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/orders"
                        render={() => {
                          return isAuthed ? (
                            <ShoppingHistory />
                          ) : (
                            <Redirect to="login" />
                          );
                        }}
                      />

                      <Route
                        exact
                        path="/checkout"
                        render={() => {
                          return isAuthed ? (
                            <Checkout />
                          ) : (
                            <Redirect to="login" />
                          );
                        }}
                      />

                      <Route
                        exact
                        path="/address"
                        render={() => {
                          return isAuthed ? (
                            <AddAddress />
                          ) : (
                            <Redirect to="login" />
                          );
                        }}
                      />

                      <Route
                        exact
                        path="/address/:id"
                        render={() => {
                          return isAuthed ? (
                            <EditAddress />
                          ) : (
                            <Redirect to="login" />
                          );
                        }}
                      />
                      {!isAuthed && (
                        <>
                          <Route path="/login" component={Login} exact={true} />{' '}
                          <Route
                            path="/signup"
                            component={Signup}
                            exact={true}
                          />
                        </>
                      )}
                    </Layout>

                    <Redirect from="/login" to="/home" />
                    <Redirect from="/singup" to="/home" />

                    <Redirect from="/" to="/home" />
                  </>
                }
              </IonRouterOutlet>
            </IonSplitPane>
          </IonApp>
        </IonReactRouter>
      </ShoppingProvider>
    </CartProvider>
  );
};

export default AuthOrDefault;
