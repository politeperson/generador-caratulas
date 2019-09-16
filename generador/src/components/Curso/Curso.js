import React from "react";

const Curso = props => {
  /*         
                    Componente Curso
    El componente muestra el curso de la carátula en tiempo real.
    
    Nota: Para los eventos onChange y OnFocus uso la 
    misma función, pues en el fondo son los mismo
  */
  return (
    <div className="row">
      <div
        className={`input-field col s12 ${
          props.curso.valid || !props.curso.touched
            ? "grey lighten-5"
            : "red lighten-5"
        }`}
      >
        <input
          id="curso"
          type="text"
          name="curso"
          onChange={props.changed}
          onFocus={props.changed}
        />
        <label htmlFor="curso">
          <b>Nombre del curso</b>
        </label>
        {!props.curso.valid && props.curso.touched ? (
          <span className="helper-text">{props.curso.errorMessage}</span>
        ) : null}
      </div>
    </div>
  );
};

// comparo el nuevo curso con el anterior, si son iguales no actualizo
// retorno true, para que React.memo()
// no renderice nuevamente el componente
const areEqual = (prevProps, nextProps) => {
  return prevProps.curso.value === nextProps.curso.value;
};

export default React.memo(Curso, areEqual);
