import React from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonCol } from '@ionic/react';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import Product from '../components/Product';
import './Home.css';

interface Product {
  imgUrl: string;
  name: string;
  info: string;
}

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
                <Product
                  imgUrl={product.imgUrl}
                  name={product.name}
                  info={product.info}
                />
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
