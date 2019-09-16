import React from "react";

const Semestre = props => {
  /*      
                            Componente Semestre
    El componente muestra el semestre de la carátula en tiempo real
    
    Nota: Para los eventos onChange y OnFocus uso la 
    misma función, pues en el fondo son los mismo
  */
  return (
    <div className="row">
      <div
        className={`input-field col s12 ${
          props.semestre.valid || !props.semestre.touched
            ? "grey lighten-5"
            : "red lighten-5"
        }`}
      >
        <input
          id="semestre"
          type="number"
          name="semestre"
          onChange={props.changed}
          onFocus={props.changed}
        />
        <label htmlFor="semestre">
          <b>Semestre</b>
        </label>
        {!props.semestre.valid && props.semestre.touched ? (
          <span className="helper-text">{props.semestre.errorMessage}</span>
        ) : null}
      </div>
    </div>
  );
};

// comparo el nuevo semestre con el anterior, si son iguales no actualizo
// retorno true, para que React.memo()
// no renderice nuevamente el componente
const areEqual = (prevProps, nextProps) => {
  return prevProps.semestre.value === nextProps.semestre.value;
};

export default React.memo(Semestre, areEqual);
