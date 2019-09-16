import React from "react";

import EditForm from "./containers/EditForm/EditForm";
import "./index.css";
// importamos materialize
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

class App extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <EditForm />
        {/* <ResultView /> */}
      </div>
    );
  }
}

export default App;
