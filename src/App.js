import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Auto from "./components/Search"




function App() {
  return (
    <div className="App">
      <h1>Custom AutoComplete React</h1>
      <div className="auto-container">
        <Auto />
      </div>
    </div>
  );
}

export default App;
