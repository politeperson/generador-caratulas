import React from "react";

import Caratula from "../../components/Caratula/Caratula";
import "./EditForm.css";

class EditForm extends React.Component {
  /*
    El componente EditForm será el formulario el cual se usará para
    editar los campos que aparecerán en la carátula
  */
  state = {
    editForm: {
      carrera: {
        value: "ciencia-de-la-computacion",
        validation: {},
        valid: true,
        touched: true
      },
      titulo: {
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "El título es requerido"
      },
      curso: {
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: "El nombre del curso es requerido"
      },
      alumno: {
        value: "",
        validation: {
          required: true
        }, // esta funcionalidad estará desactivada por ahora
        valid: false,
        touched: false,
        students: [...Array(8)],
        kind_of_students: 2, // la cantidad de alumnos en la carátula
        max_kind_of_students: 8
      },
      anio: {
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4,
          isNum: true // solo acepta números
        },
        valid: false,
        touched: false,
        errorMessage: "El año es requerido, 4 números"
      },
      semestre: {
        value: "",
        validation: {
          required: true,
          min: 1,
          max: 10
        },
        valid: false,
        touched: false,
        errorMessage: "El semestre es requerido, [1 - 10]"
      }
    },
    formIsValid: false,
    caratula: {}
  };

  checkValidity = (value, rules) => {
    if (rules) {
      let isValid = true;
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      if (rules.min) {
        isValid = +value >= rules.min && isValid;
      }

      if (rules.max) {
        isValid = +value <= rules.max && isValid;
      }

      if (rules.isNum) {
        // verifico si el valor es un número
        isValid = !isNaN(value) && isValid;
      }

      return isValid;
    }
    return true;
  };

  caratulaGenerator = editForm => {
    // el metodo caratulaGenerator me devuelve un json con todos los valores que habrá en la
    // carátula
    const formData = {};

    // eslint-disable-next-line array-callback-return
    Object.keys(editForm).map(formElementIdentifier => {
      formData[formElementIdentifier] = this.state.editForm[
        formElementIdentifier
      ].value;
    });

    //le envío el array entero con, los nombres de los alumnos
    formData.alumno = editForm.alumno.students;

    return formData;
  };

  changeFormHandler = (inputIdentifier, indexAlum = undefined) => {
    /*
      La función changeFormHandler se lanzará cada vez que algún campo
      del formulario cambie, esta función validará cada uno de los campos
      del formulario
    */

    // creo una copia de mi objeto editForm de mi state
    let updatedEditForm = { ...this.state.editForm };
    // creo una copia de mi input con el parametro inputIdentifier, para validarla
    let updatedFormElement = { ...updatedEditForm[inputIdentifier] };
    // cambio el valor del campo de formulario (input)
    updatedFormElement.value = window.event.target.value;
    // ahora valido el nuevo valor de mi campo
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    // haremos una validación especial para el campo alumno
    if (indexAlum) {
      if (
        indexAlum === updatedFormElement.kind_of_students &&
        indexAlum + 1 <= updatedFormElement.max_kind_of_students
      ) {
        //verifico si es necesario aumentar un alumno más a mi lista
        updatedFormElement.kind_of_students++;
      }

      updatedFormElement.students[indexAlum - 1] = updatedFormElement.value;
    }

    // cambiamos el campo touched a true, para que el formulario se vaya
    // validando después del primer cambio. Luego actualizamos el campo
    // de mi formulario por el nuevo campo con la validación ya hecha
    updatedFormElement.touched = true;
    updatedEditForm[inputIdentifier] = updatedFormElement;

    // ahora checkeo si cada uno de mis campos en mi formulario está validado
    let formIsValid = true;
    for (var key in updatedEditForm) {
      formIsValid = formIsValid && updatedEditForm[key].valid;
    }

    // actualizo el state, cambio el formulario, y verifico si el formulario
    // está validado
    this.setState({
      editForm: updatedEditForm,
      formIsValid: formIsValid
    });
  };

  printFormHandler = event => {
    /*
      La función printFormHandler será lanzada cuando se dé click en el botón 
      imprimir. Esta función imprimirá el pdf ya diseñado.
    */

    // evito el comportamiento habitual de los formularios, de enviar una request
    event.preventDefault();

    // creo un objeto llamado formData que tendrá los valores de cada campo
    // del formulario
    const formData = this.caratulaGenerator({ ...this.state.editForm });

    console.table(formData);
  };

  render() {
    let alumnos = [...Array(this.state.editForm.alumno.kind_of_students)].map(
      (el, i) => (
        <React.Fragment key={i}>
          <div className="input-field col s6 grey lighten-5">
            <input
              id={`alumno${i}`}
              type="text"
              name="alumno"
              onChange={this.changeFormHandler.bind(this, "alumno", i + 1)}
            />
            <label htmlFor={`alumno${i}`}>Nombre del alumno</label>
          </div>
        </React.Fragment>
      )
    );

    let caratulaData = this.caratulaGenerator(this.state.editForm);

    return (
      <div className="row">
        <form onSubmit={this.printFormHandler} className="col s6">
          <div className="row">
            <div className="input-field col s12 grey lighten-5">
              <select
                name="carrera"
                onChange={() => this.changeFormHandler("carrera")}
              >
                <optgroup label="Fac. Ingenierías y Computación">
                  <option value="ciencia-de-la-computacion">
                    Ciencia de la Computación
                  </option>
                  <option value="ingenieria-civil">Ingeniería Civil</option>
                  <option value="telecomunicaciones">
                    Ing. Electrónica y de Telecomunicaciones
                  </option>
                  <option value="ingenieria-industrial">
                    Ingeniería Industrial
                  </option>
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
                  <option value="educacion">Derecho</option>
                </optgroup>
              </select>
              <label htmlFor="carrera">Carrera: </label>
            </div>
          </div>

          <div className="row">
            <div
              className={`input-field col s12 ${
                this.state.editForm.titulo.valid ||
                !this.state.editForm.titulo.touched
                  ? "grey lighten-5"
                  : "red lighten-5"
              }`}
            >
              <input
                id="titulo"
                type="text"
                name="titulo"
                onChange={this.changeFormHandler.bind(
                  this,
                  "titulo",
                  undefined
                )}
                onFocus={this.changeFormHandler.bind(this, "titulo", undefined)}
              />
              <label htmlFor="titulo">Título del trabajo </label>
              {!this.state.editForm.titulo.valid &&
              this.state.editForm.titulo.touched ? (
                <span className="helper-text">
                  {this.state.editForm.titulo.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div
              className={`input-field col s12 ${
                this.state.editForm.curso.valid ||
                !this.state.editForm.curso.touched
                  ? "grey lighten-5"
                  : "red lighten-5"
              }`}
            >
              <input
                id="curso"
                type="text"
                name="curso"
                onChange={this.changeFormHandler.bind(this, "curso", undefined)}
                onFocus={this.changeFormHandler.bind(this, "curso", undefined)}
              />
              <label htmlFor="curso">Nombre del curso</label>
              {!this.state.editForm.curso.valid &&
              this.state.editForm.curso.touched ? (
                <span className="helper-text">
                  {this.state.editForm.curso.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="row">{alumnos}</div>

          <div className="row">
            <div
              className={`input-field col s12 ${
                this.state.editForm.anio.valid ||
                !this.state.editForm.anio.touched
                  ? "grey lighten-5"
                  : "red lighten-5"
              }`}
            >
              <input
                id="anio"
                type="text"
                name="anio"
                onChange={this.changeFormHandler.bind(this, "anio", undefined)}
                onFocus={this.changeFormHandler.bind(this, "anio", undefined)}
              />
              <label htmlFor="anio">Año Actual</label>
              {!this.state.editForm.anio.valid &&
              this.state.editForm.anio.touched ? (
                <span className="helper-text">
                  {this.state.editForm.anio.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div
              className={`input-field col s12 ${
                this.state.editForm.semestre.valid ||
                !this.state.editForm.semestre.touched
                  ? "grey lighten-5"
                  : "red lighten-5"
              }`}
            >
              <input
                id="semestre"
                type="number"
                name="semestre"
                onChange={this.changeFormHandler.bind(
                  this,
                  "semestre",
                  undefined
                )}
                onFocus={this.changeFormHandler.bind(
                  this,
                  "semestre",
                  undefined
                )}
              />
              <label htmlFor="semestre">Semestre</label>
              {!this.state.editForm.semestre.valid &&
              this.state.editForm.semestre.touched ? (
                <span className="helper-text">
                  {this.state.editForm.semestre.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <button
            className="btn waves-effect waves-light light-blue lighten-2"
            disabled={!this.state.formIsValid}
          >
            Imprimir
            <i className="material-icons right">print</i>
          </button>
        </form>

        <Caratula datos={caratulaData} />
      </div>
    );
  }
}

export default EditForm;
