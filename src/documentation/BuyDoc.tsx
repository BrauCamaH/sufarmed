import React from 'react';

const BuyDoc: React.FC = () => {
  return (
    <div className="ion-margin ion-padding">
      <h1>Compras</h1>
      <p>
        Para realizar una comprar debera accceder primero al carrito. Para
        ingresar se necesitar hacer clic en el icono superior derecho. Al
        ingresar en el carrito se podra observar que al no contar con ningun
        producto se muestra que se encuentra vacío.
      </p>
      <img src="assets/documentation/buy/empty-cart.png" />
      <p>
        Se debera agregar al menos un producto para hacer una comprar. Para
        agregar una comprar será necesario ubicar un producto y hacer clic en el
        boton Agregar a carrito, commo se mustrar en la imagen siguiente.
      </p>
      <img src="assets/documentation/buy/product-example.png" />
      <p>
        Al ser agregado un producto se mostrara en el carrito pudiendo
        eliminarse o modificarse según sea requerido.
      </p>
      <img src="assets/documentation/buy/cart-example.png" />
      <p>
        Se podrar continuar con la comprar al hacer clic en el boton de la parte
        inferior derecha. Al iniciar el proceso de compra se mostrara un
        indicador de que la comprar se esta cargando.
      </p>
      <p>
        En caso de que no exista un domicilio se mostrara el mensaje de alerta y
        aparecerá el boton de Agregar domicilio
      </p>
      <img src="assets/documentation/buy/shopping-warning.png" />
      <p>
        Se debera de llenar los datos del domicilio para completar despues poder
        ser seleccionado.
      </p>
      <img src="assets/documentation/buy/add-address.png" />
      <p>
        Al estar seleccionado el domicilio. Se podrá continuar con al compra de
        los productos al ingresar los datos de la tarjeta de crédito. El proceso
        de compra es segura gracias al servicio de &quot;Stripe&quot;.
      </p>
      <img src="assets/documentation/buy/shopping-completed.png" />

      <p>
        Al realizarse una compra existosa se mostrará la opcion de ir a inicio o
        ver el historial de compras realizadas.
      </p>
      <img src="assets/documentation/buy/success-paid.png" />
    </div>
  );
};

export default BuyDoc;
