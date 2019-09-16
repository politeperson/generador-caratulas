import React from "react";

const Titulo = props => {
  /*         
                    Componente Titulo
    El componente muestra el título de la carátula en tiempo real.
    
    Nota: Para los eventos onChange y OnFocus uso la 
    misma función, pues en el fondo son los mismo
  */
  return (
    <div className="row">
      <div
        className={`input-field col s12 ${
          props.titulo.valid || !props.titulo.touched
            ? "grey lighten-5"
            : "red lighten-5"
        }`}
      >
        <input
          id="titulo"
          type="text"
          name="titulo"
          onChange={props.changed}
          onFocus={props.changed}
        />
        <label htmlFor="titulo">
          <b>Título del trabajo</b>
        </label>
        {!props.titulo.valid && props.titulo.touched ? (
          <span className="helper-text">{props.titulo.errorMessage}</span>
        ) : null}
      </div>
    </div>
  );
};

// comparo el nuevo titulo con el anterior, si son iguales no actualizo
// retorno true, para que React.memo()
// no renderice nuevamente el componente
const areEqual = (prevProps, nextProps) => {
  return prevProps.titulo.value === nextProps.titulo.value;
};

export default React.memo(Titulo, areEqual);
