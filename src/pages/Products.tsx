import React from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from '@ionic/react';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import ProductCard from '../components/Product';
import { Product } from '../models/Product';
import './Home.css';

interface ProductsProps {
  products: Product[];
}

const Home: React.FC<ProductsProps> = ({ products }) => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            {products.map((product, index) => {
              <IonCol key={index}>
                <ProductCard product={product} />
              </IonCol>;
            })}
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
