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
import React, { useState } from 'react';
import { useUserState } from '../providers/UserProvider';
import { Address } from '../models/Address';

interface AddressItemProps {
  address: Address;
}

export const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });
  return (
    <IonItem>
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
        onDidDismiss={(e) => setShowPopover({ open: false, event: undefined })}
      >
        <IonList lines="none">
          <IonItem
            button
            routerLink="/account"
            onClick={() => {
              setShowPopover({ open: false, event: undefined });
            }}
          >
            <IonIcon className="ion-margin-end" icon={pencil} />
            <IonLabel>Modificar </IonLabel>
          </IonItem>
          <IonItem
            button
            routerLink="/account"
            onClick={() => {
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
        {state.user.addresses ? (
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
