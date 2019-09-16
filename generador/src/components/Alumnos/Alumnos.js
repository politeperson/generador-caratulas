import React from "react";

import Alumno from "./Alumno/Alumno";

const Alumnos = props => {
  let alumnos = props.lista.map((alumno, i) => (
    <React.Fragment key={i}>
      <Alumno
        id={i}
        alumno={alumno}
        changed={props.changed}
        delete={props.deleteStudent.bind(this, i)}
        errorMessage={props.errorMessage}
      />
    </React.Fragment>
  ));

  // ocho es la máxima cantidad de estudiantes
  if (props.cantidad < 8) {
    alumnos.push(
      <div key="add" className="input-field col s6 center-align">
        <button
          className="btn waves-effect waves-light light-blue lighten-2"
          onClick={props.addStudent}
        >
          Añadir Alumno
          <i className="material-icons right">add</i>
        </button>
      </div>
    );
  }

  return <div className="row">{alumnos}</div>;
};

export default Alumnos;
