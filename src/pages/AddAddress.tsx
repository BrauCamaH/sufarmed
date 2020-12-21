import React from 'react';
import {
  IonButton,
  IonCard,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
} from '@ionic/react';

import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useUserDispatch, useUserState } from '../providers/UserProvider';
import { useCreateAddress } from '../api/addresses';
import { useHistory } from 'react-router';

const AddAddress: React.FC = () => {
  const history = useHistory();
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { handleSubmit, register, errors } = useForm();
  const [createAddress] = useCreateAddress();

  const handleSave = async (data: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    indications: string;
  }) => {
    if (!state.user) return;
    const address = await createAddress({
      userId: state.user.id,
      address: data,
    });

    if (address) {
      dispatch({ type: 'add-address', payload: address });
    }
  };

  return (
    <Layout>
      <IonTitle className="ion-margin-top">Agregar un domicilio</IonTitle>
      <form onSubmit={handleSubmit(handleSave)}>
        <IonCard className="ion-margin ion-padding">
          <IonItem>
            <IonLabel position="floating">
              Nombre y apellido del contacto
            </IonLabel>
            <IonInput ref={register({ required: true })} name="name" />
          </IonItem>
          {errors.name && (
            <IonText color="danger">
              <p>Se requiere nombre</p>
            </IonText>
          )}
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Domicilio</IonLabel>
              <IonInput ref={register({ required: true })} name="address" />
            </IonItem>
          </IonRow>
          {errors.address && (
            <IonText color="danger">
              <p>Se requiere domicilio</p>
            </IonText>
          )}
          <IonRow>
            <div>
              <IonItem>
                <IonLabel position="floating">Ciudad</IonLabel>
                <IonInput ref={register({ required: true })} name="city" />
              </IonItem>
              {errors.city && (
                <IonText color="danger" className="ion-margin-end">
                  <p>Se requiere ciudad</p>
                </IonText>
              )}
            </div>
            <div>
              <IonItem>
                <IonLabel position="floating">Estado</IonLabel>
                <IonInput ref={register({ required: true })} name="state" />
              </IonItem>
              {errors.state && (
                <IonText color="danger" className="ion-margin-end">
                  <p>Se requiere ciudad</p>
                </IonText>
              )}
            </div>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Telefono de contacto</IonLabel>
              <IonInput ref={register({ required: true })} name="phone" />
            </IonItem>
          </IonRow>
          {errors.phone && (
            <IonText color="danger">
              <p>Se requiere telefono</p>
            </IonText>
          )}
          <IonItem className="ion-margin-bottom">
            <IonLabel position="floating">Indicaciones Adicionales</IonLabel>
            <IonTextarea ref={register} name="indications" />
          </IonItem>
        </IonCard>
        <IonRow className="ion-margin-start">
          <IonButton
            type="submit"
            color="secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            Guardar
          </IonButton>
          <IonButton
            color="secondary"
            routerDirection="back"
            fill="clear"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancelar
          </IonButton>
        </IonRow>
      </form>
    </Layout>
  );
};

export default AddAddress;
