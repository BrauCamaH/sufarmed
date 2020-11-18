import React from 'react';
import { IonButton, IonCard, IonIcon, IonInput, IonRow } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { search } from 'ionicons/icons';

import './Searchbar.css';

const SearhModal: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const handleSearch = (data: { text: string }) => {
    history.push(`/products?q=${data.text}`);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <IonCard>
        <IonRow>
          <IonInput
            id="searchbar"
            ref={register}
            name="text"
            inputMode="search"
            enterkeyhint="enter"
            placeholder="Buscar productos..."
            type="search"
          />
          <IonButton color="dark" fill="clear" type="submit">
            <IonIcon icon={search} />
          </IonButton>
        </IonRow>
      </IonCard>
    </form>
  );
};

export default SearhModal;
