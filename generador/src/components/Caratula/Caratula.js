import React from "react";

const Caratula = props => {
  console.log(props.datos);

  return (
    <div>
      <p>{props.datos.carrera}</p>
      <p>{props.datos.titulo}</p>
      <p>{props.datos.curso}</p>
      <p>{props.datos.alumno}</p>
      <p>{props.datos.anio}</p>
      <p>{props.datos.semestre}</p>
    </div>
  );
};

export default Caratula;
