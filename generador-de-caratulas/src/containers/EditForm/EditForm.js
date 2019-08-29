import React from "react";

import Caratula from "../../components/Caratula/Caratula";

class EditForm extends React.Component {
  /*
        El componente EditForm será el formulario el cual se usará para
        editar los campos que aparecerán en la carátula
    */
  state = {
    editForm: {
      carrera: {
        elementType: "select",
        elementConfig: {
          optgroups: {
            ingenierias: {
              label: "Fac. Ingenierías y Computación",
              options: [
                {
                  value: "ciencia-de-la-computacion",
                  displayValue: "Ciencia de la Computación"
                },
                { value: "ingenieria-civil", displayValue: "Ingeniería Civil" },
                {
                  value: "telecomunicaciones",
                  displayValue: "Ing. Electrónica y de Telecomunicaciones"
                },
                {
                  value: "ingenieria-industrial",
                  displayValue: "Ingeniería Industrial"
                }
              ]
            },
            empresariales: {
              label: "Fac. Ciencias Económico Empresariales",
              options: [
                { value: "contabilidad", displayValue: "Contabilidad" },
                {
                  value: "administracion-de-negocios",
                  displayValue: "Administración de Negocios"
                }
              ]
            },
            humanidades: {
              label: "Fac. Ciencias Humanas",
              options: [
                {
                  value: "educacion",
                  displayValue: "Educación Inicial y Educación Primaria"
                },
                { value: "psicologia", displayValue: "Psicología" }
              ]
            },
            derecho: {
              label: "Fac. Derecho",
              options: [{ value: "derecho", displayValue: "Derecho" }]
            }
          }
        },
        value: "ciencia-de-la-computacion",
        validation: {},
        valid: true
      },
      titulo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Título del trabajo"
        },
        value: "",
        validation: {
          required: true
        },
        errorMessage: "el título no debe estar vacío",
        valid: false,
        touched: false
      },
      curso: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre del Curso"
        },
        value: "",
        validation: {
          required: true
        },
        errorMessage: "el curso no debe estar vacío",
        valid: false,
        touched: false
      },
      alumno: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre del Alumno"
        },
        value: "",
        validation: {
          // required: true
          // para proteger la funcionalidad
        },
        errorMessage: "el nombre del alumno no debe estar vacío",
        valid: false,
        touched: false
      },
      anio: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Año actual"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        errorMessage: "el año no debe estar vacío",
        valid: false,
        touched: false
      },
      semestre: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Semestre actual",
          min: 1,
          max: 10
        },
        value: "",
        validation: {
          required: true,
          min: 1,
          max: 10
        },
        errorMessage:
          "especifica el semestre, solo puede ser un número entre 1 y 10",
        valid: false,
        touched: false
      }
    },
    formIsValid: false
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

      return isValid;
    }
    return true;
  };

  changeFormHandler = inputIdentifier => {
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
    const formData = {};

    // eslint-disable-next-line array-callback-return
    Object.keys(this.state.editForm).map(formElementIdentifier => {
      formData[formElementIdentifier] = this.state.editForm[
        formElementIdentifier
      ].value;
    });

    console.table(formData);
  };

  render() {
    let printForm = {};
    Object.keys(this.state.editForm).map(formElementIdentifier => {
      printForm[formElementIdentifier] = this.state.editForm[
        formElementIdentifier
      ].value;
    });

    let editForm = Object.keys(this.state.editForm).map(key => {
      return {
        id: key,
        config: this.state.editForm[key]
      };
    });

    return (
      <div>
        <form onSubmit={this.printFormHandler}>
          <input type="text" />
          <button disabled={!this.state.formIsValid}>Imprimir</button>
        </form>
        <Caratula data={printForm} />
      </div>
    );
  }
}

export default EditForm;
