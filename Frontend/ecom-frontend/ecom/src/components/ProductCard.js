import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import "../style/ProductCatalog.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/products/${product.id}`);
  };
  const formattedPrice = product.price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const isLoggedIn = localStorage.getItem("TOKEN") !== null;

    if (isLoggedIn) {
      const enteredQuantity = quantity;
      let price = product.price;
      let Productid = product.id;
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
        toast.error("Please enter a valid quantity (positive integer).");
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div
      class="card border-0 rounded-0 shadow card-img"
      style={{ height: "362.88px", width: "18rem" ,fontFamily:"Merriweather",fontWeight:"550"}}
    >
      <img
        src={product.image[0]}
        style={{ height: "160px", width: "190px", margin: "0 auto" }}
        class="card-img-top rounded-0 object-fit-contain"
        alt="..."
        onClick={goToProductDetail}
      />
      <div class="card-body mt-3 mb-3">
        <div class="row">
          <div class="col-10">
            <p class="card-title bold text-truncate" style={{ fontSize:"21px" }}>{product.name}</p>
            <Button
              variant="success"
              className="catalogButton"
              style={{ marginBottom: "7px" }}
            >
              <Rating product={product}></Rating>
            </Button>
          </div>
          <div class="col-2">
            <i class="bi bi-bookmark-plus fs-2"></i>
          </div>
          <p><b style={{ fontSize:"21px" }}>{formattedPrice}</b></p>
        </div>
      </div>

      <div class="row align-items-center text-center g-0">
        <a
          class="btn btn-dark w-100 p-2 rounded-0 text-warning text-uppercase"
          style={{ backgroundColor: "black", fontSize: "12px" }}
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

export default ProductCard;
