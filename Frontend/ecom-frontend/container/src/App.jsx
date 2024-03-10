import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import "./index.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import {BrowserRouter,Routes,Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import Signup from "./components/Signup";
import User from "./components/User";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./components/Checkout";

const ProductRouter = React.lazy(() => import("ecom/Productrouter"));

const App = () => (
  <div>

    <Suspense fallback={<div>Loading</div>}>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/products/*" element={<ProductRouter/>}> </Route>
      <Route path="/login" element={<LoginSignup/>}> </Route>
      <Route path="/signup" element={<Signup/>}> </Route>
      <Route element={<ProtectedRoute/>}>
      <Route path="/user" element={<User/>}> </Route>
      <Route path="/cart" element={<Cart/>}> </Route>
      <Route path="/checkout" element={<Checkout/>}> </Route>
      </Route>
      <Route element={<ProtectedRoute isAdmin={true} />}>
      <Route path="/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/*" element={<ErrorPage/>}> </Route>
      </Routes>
      <Footer/>
    </Suspense>
    <ToastContainer/>
  </div>
);
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"));
