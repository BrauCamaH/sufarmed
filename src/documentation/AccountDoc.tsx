import React from 'react';

export const AccountDoc: React.FC = () => {
  return (
    <div className="ion-margin ion-padding">
      <h1>Configuración de la cuenta</h1>
      <p>
        Al iniciar sesión podra acceder al apartado de la información de la
        cuenta por medio de la parte &quot;Mi cuenta&quot; en el parte superior
        izquierda en el botón de la cuenta al lado del icono de carrito.
      </p>
      <p>Se mostraran las siguiente secciones:</p>
      <img src="assets/documentation/account/account-data.png" />
      <p>
        En los datos de la cuenta se puede modificar la información relacionada
        con el correo eléctronico y contraseña de la cuenta creada. En
        importante saber que la contraseña debe de ser mayor a 6 digitos.
      </p>
      <img src="assets/documentation/account/personal-data.png" />
      <p>
        La parte de datos personales se muestra la infromación del nombre y
        telefono del usario. Siendo la última opcional.
      </p>
      <img src="assets/documentation/account/addresses-empty.png" />
      <p>
        En la parte de direciones se podran adminitrar los diferentes lugares
        donde puede llegar el pedido. Para hacer una compra es necesario contar
        con uno, por lo que se recomienda agregar una antes. En caso de no tener
        una al hacer el pago se dará la opción de crear una.
      </p>
    </div>
  );
};
