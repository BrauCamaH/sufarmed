import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';

const MainContent: React.FC = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonItem>
          <IonTitle color="tertiary">Titulo</IonTitle>
          <IonTitle color="black">$000</IonTitle>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg="6" sizeSm="auto" sizeMd="6">
              <IonCardSubtitle>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laborum corrupti facilis aut recusandae at quidem esse
                perspiciatis, voluptatum eligendi perferendis eius quaerat
                placeat incidunt rerum dolor quae repellendus! Doloremque,
                voluptate.
              </IonCardSubtitle>
            </IonCol>
            <IonCol size="auto">
              <IonList lines="none">
                <IonItem>Presentación</IonItem>
                <IonItem>Contenido por unidad</IonItem>
                <IonItem>Unidades</IonItem>
              </IonList>
            </IonCol>
            <IonCol size="auto">
              <IonItem>
                <IonLabel position="stacked">Cantidad</IonLabel>
                <IonInput type="number" maxlength={4} />
              </IonItem>
              <IonButton color="secondary">Comprar</IonButton>
              <IonButton color="secondary">
                <IonIcon icon={cart} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

const Description: React.FC = () => {
  return (
    <div>
      <IonTitle color="tertiary">Descripción</IonTitle>
      <IonItem lines="none">
        <IonCardSubtitle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          provident dolore corrupti at, cumque temporibus facere similique in
          suscipit molestias! Cupiditate similique in exercitationem, ducimus
          incidunt eligendi recusandae ab velit.
        </IonCardSubtitle>
      </IonItem>
    </div>
  );
};

const Especifications: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle color="tertiary">Especificaciones</IonTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid fixed>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonList lines="none">
                <IonItem>Formula</IonItem>
                <IonItem>
                  <IonCardSubtitle>
                    Lorem iIonCardSubtitlesum dolor sit amet consectetur
                    adipisicing elit. Placeat nemo modi eius ratione nobis
                    maiores suscipit pariatur tempore quo deleniti ab, vel
                    nostrum tempora dolorum at ipsum necessitatibus nisi ut.
                  </IonCardSubtitle>
                </IonItem>
              </IonList>
              <IonList lines="none">
                <IonItem>Indicaciones</IonItem>
                <IonItem>
                  <IonCardSubtitle>
                    Lorem iIonCardSubtitlesum dolor sit amet consectetur
                    adipisicing elit. Placeat nemo modi eius ratione nobis
                    maiores suscipit pariatur tempore quo deleniti ab, vel
                    nostrum tempora dolorum at ipsum necessitatibus nisi ut.
                  </IonCardSubtitle>
                </IonItem>
              </IonList>
            </IonCol>
            <IonCol>
              <IonList lines="none">
                <IonItem>Dosís</IonItem>
                <IonItem>
                  <IonCardSubtitle>
                    Lorem iIonCardSubtitlesum dolor sit amet consectetur
                    adipisicing elit. Placeat nemo modi eius ratione nobis
                    maiores suscipit pariatur tempore quo deleniti ab, vel
                    nostrum tempora dolorum at ipsum necessitatibus nisi ut.
                  </IonCardSubtitle>
                </IonItem>
              </IonList>
              <IonList lines="none">
                <IonItem>Vía de administración</IonItem>
                <IonItem>
                  <IonCardSubtitle>
                    Lorem iIonCardSubtitlesum dolor sit amet consectetur
                    adipisicing elit. Placeat nemo modi eius ratione nobis
                    maiores suscipit pariatur tempore quo deleniti ab, vel
                    nostrum tempora dolorum at ipsum necessitatibus nisi ut.
                  </IonCardSubtitle>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

const ProductPage: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent>
        <IonImg src="https://picsum.photos/900/500" />
        <MainContent />
        <Description />
        <Especifications />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
