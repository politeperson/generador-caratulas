import React from "react";

const UcspCarreras = props => {
  return (
    <div className="row">
      <div className="input-field col s12 grey lighten-5">
        <select name="carrera" onChange={() => props.changed("carrera")}>
          <optgroup label="Fac. Ingenierías y Computación">
            <option value="ciencia-de-la-computacion">
              Ciencia de la Computación
            </option>
            <option value="ingenieria-civil">Ingeniería Civil</option>
            <option value="telecomunicaciones">
              Ing. Electrónica y de Telecomunicaciones
            </option>
            <option value="ingenieria-industrial">Ingeniería Industrial</option>
          </optgroup>
          <optgroup label="Fac. Ciencias Económico Empresariales">
            <option value="contabilidad">Contabilidad</option>
            <option value="administracion-de-negocios">
              Administración de Negocios
            </option>
          </optgroup>
          <optgroup label="Fac. Ciencias Humanas">
            <option value="educacion">
              Educación Inicial y Educación Primaria
            </option>
            <option value="psicologia">Psicología</option>
          </optgroup>
          <optgroup label="Fac. Derecho">
            <option value="derecho">Derecho</option>
          </optgroup>
        </select>
        <label htmlFor="carrera">
          <b>Carrera</b>
        </label>
      </div>
    </div>
  );
};

export default React.memo(UcspCarreras);
