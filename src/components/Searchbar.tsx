import React from 'react';
import { IonButton, IonCard, IonIcon, IonInput, IonRow } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { search } from 'ionicons/icons';

import './Searchbar.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearhModal: React.FC = () => {
  const text = useQuery().get('q') || '';
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
            value={text}
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
