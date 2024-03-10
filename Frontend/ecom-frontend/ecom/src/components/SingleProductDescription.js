import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProductDescription = ({ details }) => {
  const formattedPrice = details.price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const [quantity, setQuantity] = useState(1);
  const quantityInputRef = useRef(null);

  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem("TOKEN") !== null;

    if (isLoggedIn) {
      const enteredQuantity = parseInt(quantityInputRef.current.value, 10);
      let price = details.price;
      let Productid = details.id;
      let id = localStorage.getItem("ID");
      if (!isNaN(enteredQuantity) && enteredQuantity > 0) {
        try {
          const response = await axios.post(
            `http://localhost:8082/cart/${id}`,
            { productid: Productid, quantity: quantity, productPrice: price }
          );
          toast.success("Product added to cart successfully!");
        } catch (error) {
          toast.error("Error adding product to cart:", error);
        }
      } else {
        toast.error("Please enter a valid quantity ");
      }
    } else {
      navigate(`/login`);
    }
  };

  const handleInputChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10);
    if (!isNaN(enteredQuantity) && enteredQuantity >= 0) {
      setQuantity(enteredQuantity);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" ,fontFamily:"Roboto"}}>
      <div style={{fontWeight:"600" , fontSize: "25px" }}>{details.brand}</div>
      <hr></hr>
      <h1 style={{ fontWeight: "700", fontSize: "40px"}}>{details.name}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontWeight: "550",
          fontSize:"18px"
        }}
      >
        MRP. {formattedPrice}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" ,fontSize:"18px"}}>
        Price inclusive of all taxes
      </div>
      <br></br>
      <Button variant="success" style={{ alignSelf: "flex-start" }}>
        <Rating product={details}></Rating>
      </Button>
      <br></br>
      <br></br>
      <div>
        <ul>
          <b style={{fontSize:"20px"}}>Product Details</b>
          {details.description.map((product) => (
            <li style={{fontSize:"18px"}}>{product}</li>
          ))}
        </ul>
      </div>
      <br></br>
      <div
        class="d-flex flex-row align-items-center"
        style={{ paddingRight: "12px" }}
      >
        <button
          onClick={() => setQuantity(quantity - 1)}
          class="btn btn-sm btn-outline-secondary"
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <span style={{color:"black" , fontWeight:"700"}}>-</span>
        </button>
        <span style={{ margin: "5px" }}>
          <input
            ref={quantityInputRef}
            type="number"
            min={0}
            value={quantity}
            onChange={handleInputChange}
            style={{ width: "40px", textAlign: "center" }}
          />
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          class="btn btn-sm btn-outline-secondary"
        >
        <span style={{color:"black" , fontWeight:"700"}}>+</span>
        </button>
      </div>
      <div class="row align-items-center text-center g-0" style={{width:"150px",marginTop:"10px"}}>
        <a
          class="btn btn-dark w-100 p-2 rounded-0 text-warning text-uppercase"
          style={{ backgroundColor: "black", fontSize: "12px"}}
          onClick={handleAddToCart}
        >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
            style={{margin:"0px 5px 7px 0px"}}
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          Add to Cart
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleProductDescription;
