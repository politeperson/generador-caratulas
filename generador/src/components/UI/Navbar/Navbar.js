import React from "react";

import acm from "../../../assets/images/acm-chapter.png";

const Navbar = props => {
  return (
    <nav>
      <div className="nav-wrapper indigo darken-1">
        <a
          href="https://www.facebook.com/ACMUCSP/"
          target="_blank"
          rel="noopener noreferrer"
          className="brand-logo left"
        >
          <img
            className="responsive-img"
            style={{ height: "4rem" }}
            src={acm}
            alt="acm-chapter"
          />
        </a>
        <ul id="nav-mobile" className="right">
          <li>
            <a
              href="https://www.facebook.com/ACMUCSP/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UCSP ACM Chapter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
