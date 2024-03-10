import React from "react";
import ReactDOM from "react-dom";
import Productrouter from './components/Productrouter'
import { BrowserRouter,Routes,Route } from "react-router-dom";

import "./index.css";

const App = () => (
  <div>
        <Productrouter/>
  </div>
);
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"));
