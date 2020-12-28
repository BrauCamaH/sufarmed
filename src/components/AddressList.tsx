import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
} from '@ionic/react';
import {
  ellipsisVertical,
  locationOutline,
  pencil,
  trash,
} from 'ionicons/icons';
import { useUserDispatch, useUserState } from '../providers/UserProvider';
import { Address } from '../models/Address';
import { useDeleteAddress } from '../api/addresses';

interface AddressItemProps {
  address: Address;
}

export const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
  const dispatch = useUserDispatch();
  const [deleteAddress, { isLoading }] = useDeleteAddress();
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  return (
    <IonItem disabled={isLoading}>
      <IonButton
        fill="clear"
        slot="end"
        onClick={(e) => setShowPopover({ open: true, event: e.nativeEvent })}
      >
        <IonIcon icon={ellipsisVertical} />
      </IonButton>
      <IonPopover
        isOpen={showPopover.open}
        showBackdrop={false}
        event={showPopover.event}
        onDidDismiss={() => setShowPopover({ open: false, event: undefined })}
      >
        <IonList lines="none">
          <IonItem
            button
            routerLink={`/address/${address.id}`}
            onClick={() => {
              setShowPopover({ open: false, event: undefined });
            }}
          >
            <IonIcon className="ion-margin-end" icon={pencil} />
            <IonLabel>Modificar </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={async () => {
              const deletedAddress = await deleteAddress(address.id);
              if (deletedAddress) {
                dispatch({
                  type: 'delete-address',
                  payload: deletedAddress,
                });
              }
              setShowPopover({ open: false, event: undefined });
            }}
          >
            <IonIcon className="ion-margin-end" icon={trash} />
            <IonLabel>Eliminar </IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonCol>
        <IonLabel>{address.address}</IonLabel>
        <IonCardSubtitle>{address.indications}</IonCardSubtitle>
        <IonCardSubtitle>
          {address.state}, {address.city}
        </IonCardSubtitle>
        <IonCardSubtitle>
          {address.name}-{address.phone}
        </IonCardSubtitle>
      </IonCol>
    </IonItem>
  );
};

const AddressList: React.FC = () => {
  const state = useUserState();

  if (!state.user) {
    return null;
  }

  return (
    <IonCard className="ion-padding">
      <>
        {state.user.addresses.length !== 0 ? (
          <IonList>
            {state.user.addresses.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </IonList>
        ) : (
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonButton fill="clear">
              <IonIcon icon={locationOutline} />
            </IonButton>
            <IonCardSubtitle>
              No tienes ninguna dirección cargada
            </IonCardSubtitle>
          </IonRow>
        )}
      </>
      <IonButton routerLink="/address" color="secondary" expand="block">
        Agregar domicilio
      </IonButton>
    </IonCard>
  );
};

export default AddressList;
