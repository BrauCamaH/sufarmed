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

import { useForm } from 'react-hook-form';
import { useUserDispatch, useUserState } from '../providers/UserProvider';
import { useEditAddress, useGetAddressById } from '../api/addresses';
import { useHistory, useParams } from 'react-router';
import Spinner from '../components/loaders/Spinner';

const AddAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const state = useUserState();
  const { data: address, isLoading } = useGetAddressById(parseInt(id));
  const dispatch = useUserDispatch();
  const { handleSubmit, register, errors } = useForm();
  const [editAdress, { isLoading: isUpdating }] = useEditAddress();

  const handleSave = async (data: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    indications: string;
  }) => {
    if (!address) return;
    if (!state.user) return;
    const editedAddress = await editAdress({ ...address, ...data });

    if (editedAddress) {
      dispatch({ type: 'update-address', payload: editedAddress });
    }
    history.goBack();
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <>
        <IonTitle className="ion-margin-top">Agregar un domicilio</IonTitle>
        <form onSubmit={handleSubmit(handleSave)}>
          <IonCard className="ion-margin ion-padding" disabled={isUpdating}>
            <IonItem>
              <IonLabel position="floating">
                Nombre y apellido del contacto
              </IonLabel>
              <IonInput
                ref={register({ required: true })}
                name="name"
                value={address?.name}
              />
            </IonItem>
            {errors.name && (
              <IonText color="danger">
                <p>Se requiere nombre</p>
              </IonText>
            )}
            <IonRow>
              <IonItem>
                <IonLabel position="floating">Domicilio</IonLabel>
                <IonInput
                  ref={register({ required: true })}
                  name="address"
                  value={address?.address}
                />
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
                  <IonInput
                    ref={register({ required: true })}
                    name="city"
                    value={address?.city}
                  />
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
                  <IonInput
                    ref={register({ required: true })}
                    name="state"
                    value={address?.state}
                  />
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
                <IonInput
                  ref={register({ required: true })}
                  name="phone"
                  value={address?.phone}
                />
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
            <IonButton type="submit" color="secondary" disabled={isUpdating}>
              Guardar
            </IonButton>
            <IonButton
              color="secondary"
              routerDirection="back"
              fill="clear"
              onClick={() => {
                history.goBack();
              }}
              disabled={isUpdating}
            >
              Cancelar
            </IonButton>
          </IonRow>
        </form>
      </>
    </div>
  );
};

export default AddAddress;
