import React from "react";
import "./App.scss";
import { DROPDOWN_PROPS } from "./constants";
import MultiSelectDropdown from "./MultiSelectDropdown/MultiSelectDropdown";

function App(): React.ReactElement {
  return (
    <div className="App">
      <MultiSelectDropdown {...DROPDOWN_PROPS} />
    </div>
  );
}

export default App;
