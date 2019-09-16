import React from "react";

const Anio = props => {
  /*      
                            Componente Anio
    El componente muestra el anio de la carátula en tiempo real
    
    Nota: Para los eventos onChange y OnFocus uso la 
    misma función, pues en el fondo son los mismo
  */
  return (
    <div className="row">
      <div
        className={`input-field col s12 ${
          props.anio.valid || !props.anio.touched
            ? "grey lighten-5"
            : "red lighten-5"
        }`}
      >
        <input
          id="anio"
          type="text"
          name="anio"
          value={props.anio.value}
          onChange={props.changed}
          onFocus={props.changed}
        />
        <label htmlFor="anio">
          <b>Año Actual</b>
        </label>
        {!props.anio.valid && props.anio.touched ? (
          <span className="helper-text">{props.anio.errorMessage}</span>
        ) : null}
      </div>
    </div>
  );
};

// comparo el nuevo año con el anterior, si son iguales no actualizo
// retorno true, para que React.memo()
// no renderice nuevamente el componente
const areEqual = (prevProps, nextProps) => {
  return prevProps.anio.value === nextProps.anio.value;
};

export default React.memo(Anio, areEqual);
