import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Menu } from './components/Appbar';

import { CartProvider } from './providers/CartProvider';
import { useUserState } from './providers/UserProvider';
import { ShoppingProvider } from './providers/ShoppingProvider';

import Layout from './components/Layout';
import Spinner from './components/loaders/Spinner';

const Home = React.lazy(() => import('./pages/Home'));
const ShoppingHistory = React.lazy(() => import('./pages/ShoppingHistory'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Products = React.lazy(() => import('./pages/Products'));
const Product = React.lazy(() => import('./pages/Product'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Account = React.lazy(() => import('./pages/Account'));
const Help = React.lazy(() => import('./pages/Help'));
const AddAddress = React.lazy(() => import('./pages/AddAddress'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const EditAddress = React.lazy(() => import('./pages/EditAddress'));

const AccountDoc = React.lazy(() => import('./documentation/AccountDoc'));
const BuyDoc = React.lazy(() => import('./documentation/BuyDoc'));
const Contact = React.lazy(() => import('./documentation/Contact'));

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
                      <Suspense fallback={<Spinner />}>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/products" component={Products} />
                        <Route exact path="/product/:id" component={Product} />
                        <Route
                          exact
                          path="/categories"
                          component={Categories}
                        />
                        <Route exact path="/help" component={Help} />

                        <Route
                          exact
                          path="/cart"
                          render={() => {
                            return isAuthed ? (
                              <Cart />
                            ) : (
                              <Redirect to="login" />
                            );
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
                        <Route
                          exact
                          path="/account-info"
                          component={AccountDoc}
                        />
                        <Route exact path="/shopping-info" component={BuyDoc} />
                        <Route exact path="/contact" component={Contact} />
                        {!isAuthed && (
                          <>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                          </>
                        )}
                      </Suspense>
                    </Layout>

                    <Redirect exact from="/login" to="/home" />
                    <Redirect exact from="/singup" to="/home" />

                    <Redirect exact from="/" to="/home" />
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
