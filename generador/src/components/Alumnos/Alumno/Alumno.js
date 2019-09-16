import React from "react";

import "./Alumno.css";

const Alumno = props => {
  return (
    <div
      className={`input-field col s6 ${
        props.alumno.valid || !props.alumno.touched
          ? "grey lighten-5"
          : "red lighten-5"
      }`}
    >
      {props.id > 0 ? (
        <i
          className="material-icons prefix"
          style={{ cursor: "pointer" }}
          onClick={props.delete}
        >
          delete
        </i>
      ) : null}
      <input
        type="text"
        name="alumno"
        className="alumno"
        placeholder="nombre del alumno"
        value={props.alumno.value}
        onChange={props.changed.bind(this, props.id)}
        onFocus={props.changed.bind(this, props.id)}
      />
      {!props.alumno.valid && props.alumno.touched ? (
        <span className="helper-text">{props.errorMessage}</span>
      ) : null}
    </div>
  );
};

export default Alumno;
