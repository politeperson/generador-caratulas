import React from "react";

import acm from "../../../assets/images/acm-chapter.png";

const Footer = props => {
  return (
    <footer className="page-footer indigo darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 m6 s12 center">
            <h5 className="white-text">
              <b>Generador de Carátulas</b>
            </h5>
            <p className="grey-text text-lighten-4">
              <b>Creado por: Saúl Rojas</b>
              <br></br>
              <b>Email: saul.rojas@ucsp.edu.pe</b>
            </p>
          </div>
          <div className="col l6 m6 s12 s12 center">
            <a
              href="https://www.facebook.com/ACMUCSP/"
              target="_blank"
              rel="noopener noreferrer"
              className="center"
            >
              <img className="responsive-img" src={acm} alt="acm-chapter" />
            </a>
            <h6 className="white-text">
              <b>Fork me on Github</b>
            </h6>
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                  href="https://github.com/politeperson/generador-caratulas"
                >
                  Github Project
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">Copyright © 2019 Generador de Carátulas</div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
