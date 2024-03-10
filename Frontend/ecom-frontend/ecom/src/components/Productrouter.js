import React from "react";
import ReactDOM from "react-dom";
import ProductCatalog from './ProductCatalog';
import ProductDetails from './ProductDetails';
import { BrowserRouter,Routes,Route } from "react-router-dom";

// import "./index.css";

const Productrouter = () => (
  <div>
        <Routes>
          <Route path="/" element={<ProductCatalog/>}/>
          <Route path="/:id" element={<ProductDetails/>}/>
        </Routes>
  </div>
);
export default Productrouter;