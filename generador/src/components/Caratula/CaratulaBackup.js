import React from "react";

import logo from "../../assets/images/logo2.png";
import "./Caratula.css";

const Caratula = props => {
  let alumnos = [];
  if (!(typeof props.datos.alumnos === "string")) {
    props.datos.alumnos.forEach(el => {
      if (el !== "") {
        alumnos.push(el);
      }
    });
  }

  alumnos = alumnos.map((el, index) => {
    return <li key={index}>{el}</li>;
  });

  if (alumnos.length === 0) {
    alumnos.push("Alumno");
  }

  return (
    <div className="col s6">
      <div className="row">
        <div className="col s12 right-align">
          <img className="responsive-img" src={logo} alt="logo" />
        </div>
      </div>
      <div className="row">
        <div className="col s12 center-align">
          <p>{props.datos.carrera}</p>
        </div>
        <div className="col s12 center-align">
          <p>{props.datos.titulo}</p>
        </div>
        <div className="col s12 center-align">
          <p>{props.datos.curso}</p>
        </div>
      </div>
      <div className="row">
        <div className="col s12 pull-s2 right-align">
          {alumnos.length === 0 ? <p>Alumno</p> : <ul>{alumnos}</ul>}
        </div>
        <div className="col s12 pull-s2 right-align">
          <p>CICLO {props.datos.semestre}</p>
        </div>
        <div className="col s12 pull-s2 right-align">
          <p>{props.datos.anio}</p>
        </div>
      </div>
      <div className="row">
        <div
          className="col s12 center-align"
          children={
            alumnos.length < 2
              ? '"El alumno declara haber realizado el presente trabajo de acuerdo a las normas de la Universidad Católica San Pablo"'
              : '"Los alumnos declaran haber realizado el presente trabajo de acuerdo a las normas de la Universidad Católica San Pablo"'
          }
        />
      </div>
      <div className="row">
        <div className="col s12 center-align">
          {[...alumnos].map((el, i) =>
            i !== 3 ? (
              <span key={i}>__________ </span>
            ) : (
              <React.Fragment key={i}>
                <span>__________ </span>
                <br></br>
              </React.Fragment>
            )
          )}
        </div>
        <div
          className="col s12 center-align"
          children={alumnos.length > 1 ? "Firmas" : "Firma"}
        />
      </div>
    </div>
  );
};

export default Caratula;
