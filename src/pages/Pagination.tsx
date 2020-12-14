import React from 'react';
import { IonButton, IonCard, IonIcon, IonRow } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  nItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ nItems, page, setPage }) => {
  return (
    <IonRow className="ion-justify-content-center ion-align-items-center ion-margin-top">
      <IonButton
        disabled={page == 1}
        fill="clear"
        onClick={() => {
          setPage(page - 1);
        }}
      >
        <IonIcon icon={chevronBack} />
      </IonButton>
      {nItems &&
        Array.from(Array(nItems).keys()).map((item) => {
          return (
            <div key={item}>
              {item + 1 == page ? (
                <IonCard>
                  <IonButton fill="clear">{item + 1}</IonButton>
                </IonCard>
              ) : (
                <IonButton
                  fill="clear"
                  onClick={() => {
                    setPage(item + 1);
                  }}
                >
                  {item + 1}
                </IonButton>
              )}
            </div>
          );
        })}
      <IonButton
        fill="clear"
        disabled={page == nItems}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        <IonIcon icon={chevronForward} />
      </IonButton>
    </IonRow>
  );
};

export default Pagination;
