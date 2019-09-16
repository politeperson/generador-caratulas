import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import Caratula from "../../components/Caratula/Caratula";
import UcspCarreras from "../../components/UcspCarreras/UcspCarreras";
import Titulo from "../../components/Titulo/Titulo";
import Curso from "../../components/Curso/Curso";
import Alumnos from "../../components/Alumnos/Alumnos";
import Anio from "../../components/Anio/Anio";
import Semestre from "../../components/Semestre/Semestre";
import Logo from "../../assets/images/encodedLogo";
import "./EditForm.css";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
        value: "Título del trabajo",
        validation: {
          required: true,
          maxLength: 40
        },
        valid: false,
        touched: false,
        errorMessage: "⚠ rellena este campo, no más de 40 caracteres"
      },
      curso: {
        value: "Curso",
        validation: {
          required: true,
          maxLength: 40
        },
        valid: false,
        touched: false,
        errorMessage: "⚠ rellena este campo, no más de 40 caracteres"
      },
      alumnos: {
        lista: [
          {
            value: "",
            valid: false,
            touched: false
          }
        ],
        validation: {
          required: true,
          maxLength: 40
        },
        errorMessage: "⚠ rellena este campo, no más de 40 caracteres",
        valid: false,
        cantidad: 1
      },
      anio: {
        value: new Date().getFullYear(),
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4,
          isNum: true // solo acepta números
        },
        valid: false,
        touched: false,
        errorMessage: "⚠ rellena este campo, no más de 4 dígitos"
      },
      semestre: {
        value: "1",
        validation: {
          required: true,
          min: 1,
          max: 10
        },
        valid: false,
        touched: false,
        errorMessage: "⚠ rellena este campo, entre [1 - 10]"
      },
      urlForm: ""
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
    Object.keys(editForm).map(id => {
      formData[id] = this.state.editForm[id].value;
    });

    switch (formData.carrera) {
      case "ciencia-de-la-computacion":
        formData.carrera = "Ciencia de la Computación";
        break;
      case "ingenieria-civil":
        formData.carrera = "Ingeniería Civil";
        break;
      case "telecomunicaciones":
        formData.carrera = "Ing. Electrónica y de Telecomunicaciones";
        break;
      case "ingenieria-industrial":
        formData.carrera = "Ingeniería Industrial";
        break;
      case "contabilidad":
        formData.carrera = "Contabilidad";
        break;
      case "administracion-de-negocios":
        formData.carrera = "Administración de Negocios";
        break;
      case "educacion":
        formData.carrera = "Educación Inicial y Educación Primaria";
        break;
      case "psicologia":
        formData.carrera = "Psicología";
        break;
      case "derecho":
        formData.carrera = "Derecho";
        break;
      default:
        break;
    }

    //le envío el array entero con, los nombres de los alumnos
    // si el usuario no inserta ningún alumno, el valor por defecto
    // será 'Alumno'
    formData.alumnos =
      editForm.alumnos.lista.length === 1 &&
      editForm.alumnos.lista[0].value === ""
        ? "Alumno"
        : editForm.alumnos.lista.map(alumno => alumno.value);
    // poniendo la url de la página de preview
    formData.urlForm = editForm.urlForm;
    return formData;
  };

  checkValidForm = form => {
    /*
      Esta función chequea si cada uno de los campos en mi formulario está validado
      y retorna true si lo está, sino false
    */
    let formIsValid = true;
    for (var key in form) {
      formIsValid = formIsValid && form[key].valid;
    }
    return formIsValid;
  };

  changeAlumnosHandler = index => {
    /*
      La función changeAlumnosHandler es una función especial sólo
      para los alumnos
    */
    // creo una copia de mi objeto editForm de mi state
    let updatedEditForm = { ...this.state.editForm };
    // creo una copia de alumnos en el state, para validarlo
    let updatedAlumnosElement = { ...updatedEditForm.alumnos };
    // cambio el valor del campo de formulario (input)
    updatedAlumnosElement.lista[index].value = window.event.target.value;
    // ahora valido el nuevo valor en la lista de alumnos
    updatedAlumnosElement.lista[index].valid = this.checkValidity(
      updatedAlumnosElement.lista[index].value,
      updatedAlumnosElement.validation
    );
    // cambio el estado de touched a true
    updatedAlumnosElement.lista[index].touched = true;

    // ahora valido a todos los alumnos del formulario, y cambio
    // la propiedad valid de alumnos
    let alumnosValid = true;
    for (let i = 0; i < updatedAlumnosElement.cantidad; i++) {
      alumnosValid = updatedAlumnosElement.lista[i].valid && alumnosValid;
    }
    updatedAlumnosElement.valid = alumnosValid;
    updatedEditForm.alumnos = updatedAlumnosElement;

    // por último chequeo si el formulario es válido
    let formIsValid = this.checkValidForm(updatedEditForm);

    this.setState({
      editForm: updatedEditForm,
      formIsValid: formIsValid
    });
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

    // por último chequeo si el formulario es válido
    let formIsValid = this.checkValidForm(updatedEditForm);

    // actualizo el state, cambio el formulario, y verifico si el formulario
    // está validado
    this.setState({
      editForm: updatedEditForm,
      formIsValid: formIsValid
    });
  };

  addStudent = () => {
    // creo una copia de mi objeto editForm de mi state
    let updatedEditForm = { ...this.state.editForm };
    // creo una copia de mi input con el parametro inputIdentifier, para validarla
    let updatedAlumnos = { ...updatedEditForm.alumnos };
    updatedAlumnos.cantidad++; // aumento la cantidad e estudiantes
    updatedAlumnos.lista.push({ value: "", valid: false, touched: false }); // agrego un nuevo estudiante a mi lista
    updatedEditForm.alumnos = updatedAlumnos;
    this.setState({ editForm: updatedEditForm, formIsValid: false });
  };

  deleteStudent = index => {
    // creo una copia de mi objeto editForm de mi state
    let updatedEditForm = { ...this.state.editForm };
    // creo una copia de mi alumnos
    let updatedAlumnos = { ...updatedEditForm.alumnos };
    // reduzco la cantidad de alumnos en la carátula
    updatedAlumnos.cantidad--;
    // al alumno eliminado
    updatedAlumnos.lista.splice(index, 1);
    updatedEditForm.alumnos = updatedAlumnos;
    this.setState({ editForm: updatedEditForm });
  };

  generatePDF = data => {
    data.alumnos =
      typeof data.alumnos === "string"
        ? [data.alumnos]
        : data.alumnos.filter(alumno => alumno !== "");

    // poniendo la cantidad de lineas para firmar
    let lines = [...data.alumnos].map((el, i) =>
      i === 4 ? "\n\n_______________" : "_______________"
    );

    let docDefinition = {
      pageSize: "A4", // formato A4
      content: [
        {
          // poniendo la imagen del logo dentro del pdf
          svg: Logo,
          width: 200,
          height: 100,
          style: "logo"
        },
        {
          text: data.carrera,
          style: "cabecera"
        },
        {
          text: data.titulo,
          style: "cabecera"
        },
        {
          text: data.curso,
          style: "cabecera"
        },
        {
          type: "none",
          ul: data.alumnos, // los alumnos
          style: "cuerpo"
        },
        {
          text: `CICLO ${data.semestre}`,
          style: "cuerpo"
        },
        {
          text: "2019",
          style: "cuerpo"
        },
        {
          text:
            data.alumnos.length < 2
              ? '"El alumno declara haber realizado el presente trabajo de acuerdo a las normas de la Universidad Católica San Pablo"'
              : '"Los alumnos declaran haber realizado el presente trabajo de acuerdo a las normas de la Universidad Católica San Pablo"',
          style: "footer",
          margin: [0, 98 - 8 * data.alumnos.length, 0, 0]
        },
        {
          // máximo 4 columnas
          text: lines.join(" "),
          style: "footer",
          margin: [0, 20, 0, 0]
        },
        {
          text: data.alumnos.length > 1 ? "Firmas" : "Firma",
          style: "footer",
          margin: [0, 10, 0, 0]
        }
      ],
      styles: {
        logo: {
          alignment: "right",
          //left, top, right, botton
          margin: [0, 5, 10, 40]
        },
        cabecera: {
          fontSize: 21,
          alignment: "center",
          margin: [0, 0, 0, 30]
        },
        cuerpo: {
          fontSize: 15,
          alignment: "right",
          margin: [0, 0, 20, 20]
        },
        footer: {
          fontSize: 15,
          alignment: "center"
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
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

    this.generatePDF(formData);
  };

  render() {
    /*
      SOLO ACTUALIZAR EL COMPONENTE ALUMNOS CUANDO SE AGREGUE UNO
      USAR REACT.MEMO() EN LOS OTROS COMPONENTES
    */
    let caratula = this.caratulaGenerator(this.state.editForm);
    return (
      <div className="row">
        <form onSubmit={e => e.preventDefault()} className="col s6">
          <UcspCarreras changed={this.changeFormHandler} />

          <Titulo
            titulo={this.state.editForm.titulo}
            changed={this.changeFormHandler.bind(this, "titulo")}
          />

          <Curso
            curso={this.state.editForm.curso}
            changed={this.changeFormHandler.bind(this, "curso")}
          />

          <Alumnos
            lista={this.state.editForm.alumnos.lista}
            cantidad={this.state.editForm.alumnos.cantidad}
            changed={this.changeAlumnosHandler}
            changeSex={this.maleFemalechecker}
            deleteStudent={this.deleteStudent}
            addStudent={this.addStudent}
            errorMessage={this.state.editForm.alumnos.errorMessage}
            sex={this.state.editForm.alumnos.male}
          />

          <Anio
            anio={this.state.editForm.anio}
            changed={this.changeFormHandler.bind(this, "anio")}
          />

          <Semestre
            semestre={this.state.editForm.semestre}
            changed={this.changeFormHandler.bind(this, "semestre")}
          />

          <button
            className="btn waves-effect waves-light light-blue lighten-2 tooltipped"
            data-position="top"
            data-tooltip="🔔 Verifica la carátula antes de generarla!"
            onClick={this.printFormHandler}
          >
            Generar
            <i className="material-icons right">insert_drive_file</i>
          </button>
        </form>
        <Caratula datos={caratula} />
      </div>
    );
  }
}

export default EditForm;
