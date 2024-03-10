import React, { useEffect, useState } from "react";
import "../styles/cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "./ErrorComponent";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [cartid, setCartId] = useState();
  const [currPrice, setCurrPrice] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        let id = localStorage.getItem("ID");
        const response = await axios.get(
          `http://localhost:8082/get-cart/${id}`
        );
        const cartItems = response.data.cartItems;
        setCartId(response.data.cartId);
        setCartItems(cartItems || []);
        setCart(response.data);
        getProducts(response.data);
      }  catch (error) {
        console.error("Error fetching products:", error);
        if (!error.response) { 
          setError("maintenance"); 
        } else if (error.response.status !== 500) { 
          setError(error.response.status); 
        } else {
          setError(true); 
        }
      }
    };
    fetchCartItems();
  }, [cartItems]);

  const navigate = useNavigate();
  const goToProductDetail = () => {
    navigate(`/products`);
  };

  const goToOrder = () => {
      navigate(`/checkout`);
  }

  const goToCheckout = async () => {
    try {
      let id = localStorage.getItem("ID");
      const response = await axios.get(`http://localhost:8082/checkout/${id}`);
      setCartItems([]);
      goToOrder();
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const getProducts = async (cartItems) => {
    try {
      let totalProducts = [];
      for (const element of cartItems.cartItems) {
        let id = element.productid;
        const response = await axios.get(
          `http://localhost:8081/products/${id}`
        );
        totalProducts.push(response.data);
        setLoading(false);
      }
      setProducts(totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // const getProducts = async (cartItems) => {
  //     try {
  //         cartItems.cartItems.forEach(async element => {
  //             let id=element.productid;
  //             const response =await axios.get(`http://localhost:8081/products/${id}`);
  //             setProducts([...products,response.data]);
  //                 setLoading(false);
  //         });

  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       setLoading(false);
  //     }
  //   };
  const handleQuantityChange = async (Productid, action) => {
    try {
      let updatedQuantity;
      switch (action) {
        case "increase":
          updatedQuantity = 1;
          break;
        case "decrease":
          updatedQuantity = -1;
          break;
        case "delete":
          updatedQuantity = 0;
          break;
        default:
          updatedQuantity = 0;
      }
      const response = await axios.put(
        `http://localhost:8082/carts/${cartid}`,
        {
          productid: Productid,
          quantity: updatedQuantity,
        }
      );
      const updatedCart = response.data;
      setCartItems(updatedCart.cartItems);
      setCart(updatedCart);
      console.log(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return ( error ? (
    <ErrorComponent message={ 
      error === "maintenance" ? "Site Under Maintenance" : 
        error === true ? "Internal Server Error" : 
          `Error: ${error}` 
    } />
  ) :
    <section class="h-100 h-custom" style={{ backgroundColor: "#EEEEEE" }}>
      <div class="container py-5 h-100">
        {cartItems?.length === 0 ? (
          <div class="row">
            <div class="col">
              <div class="card text-center">
                <div class="card-body">
                  <i class="fas fa-shopping-cart fa-5x mb-3"></i>
                  <h5>Your cart is currently empty!</h5>
                  <p>Visit our products page to find something you like.</p>
                  <button
                    type="button"
                    class="btn btn-info btn-lg"
                    style={{backgroundColor:"black",color:"white"}}
                    onClick={goToProductDetail}
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                  <div class="card">
                    <div class="card-body p-4">
                      <div class="row">
                        <div class="col-lg-9">
                          <div class row>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                              <div style={{ paddingLeft: "35px" }}>
                                <h5>Image</h5>
                              </div>
                              <div style={{ paddingLeft: "40px" }}>
                                <h5>Name</h5>
                              </div>
                              <div style={{ paddingLeft: "190px" }}>
                                <h5>Price</h5>
                              </div>
                              <div style={{ paddingRight: "40px" }}>
                                <h5>Quantity</h5>
                              </div>
                              <div style={{ paddingRight: "58px" }}>
                                <h5>Action</h5>
                              </div>
                            </div>
                          </div>
                          <div class="card mb-3">
                            <div class="card-body">
                              {cartItems.map((item, index) => (
                                <div class="card mb-3" key={item.id}>
                                  <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                      <div class="d-flex flex-row align-items-center">
                                        <div>
                                          <img
                                            src={
                                              products
                                                ? products[index]?.image
                                                  ? products[index].image[0]
                                                  : ""
                                                : ""
                                            }
                                            class="img-fluid rounded-3"
                                            alt="Shopping item"
                                            style={{ width: "65px" }}
                                          />
                                        </div>
                                        <div
                                          class="ms-3"
                                          style={{ paddingLeft: "40px" }}
                                        >
                                          <h5>
                                            {products
                                              ? products[index]
                                                ? products[index].name
                                                : ""
                                              : ""}
                                          </h5>
                                        </div>
                                      </div>
                                      <div class="d-flex flex-row align-items-center">
                                        <div
                                          style={{
                                            width: "80px",
                                            marginRight: "38px",
                                          }}
                                        >
                                          <h5>{item.productPrice}</h5>
                                        </div>
                                        <div style={{ paddingRight: "70px" }}>
                                          <h5>{item.quantity}</h5>
                                        </div>
                                        <div
                                          class="d-flex flex-row align-items-center"
                                          style={{ paddingRight: "12px" }}
                                        >
                                          <button
                                            disabled={isLoading}
                                            onClick={() =>
                                              handleQuantityChange(
                                                item.productid,
                                                "decrease"
                                              )
                                            }
                                            class="btn btn-sm btn-outline-secondary"
                                            style={{
                                              paddingLeft: "10px",
                                              paddingRight: "10px",
                                            }}
                                          >
                                            -
                                          </button>
                                          <button
                                            disabled={isLoading}
                                            onClick={() =>
                                              handleQuantityChange(
                                                item.productid,
                                                "increase"
                                              )
                                            }
                                            class="btn btn-sm btn-outline-secondary"
                                            style={{ margin: "8px" }}
                                          >
                                            +
                                          </button>
                                          <a
                                            disabled={isLoading}
                                            onClick={() =>
                                              handleQuantityChange(
                                                item.productid,
                                                "delete"
                                              )
                                            }
                                            class="btn btn-sm btn-outline-danger ms-2"
                                          >
                                            <i class="bi bi-trash">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-trash"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                              </svg>
                                            </i>
                                          </a>
                                        </div>
                                        <a
                                          href="#!"
                                          style={{ color: "#cecece" }}
                                        >
                                          <i class="fas fa-trash-alt"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p class="mb-1">Shopping cart</p>
                    <p class="mb-0">You have {cartItems.length} items in your cart</p>
                  </div>
                </div>
                <h5 class="mb-3" onClick={goToProductDetail}><a href="#!" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                        </div>
                        <div class="col-lg-3">
                          <div
                            class="card text-black rounded-3"
                            style={{ backgroundColor: "white" }}
                          >
                            <div class="card-body">
                              <a href="#!" type="submit" class="text-white">
                                <i class="fab fa-cc-mastercard fa-2x me-2"></i>
                              </a>
                              <a href="#!" type="submit" class="text-white">
                                <i class="fab fa-cc-visa fa-2x me-2"></i>
                              </a>
                              <a href="#!" type="submit" class="text-white">
                                <i class="fab fa-cc-amex fa-2x me-2"></i>
                              </a>
                              <a href="#!" type="submit" class="text-white">
                                <i class="fab fa-cc-paypal fa-2x"></i>
                              </a>
                              <p style={{ fontWeight: "700px" , fontSize:"22px"}}>
                                Order Summary
                              </p>
                              <hr class="my-4" />

                              <div class="d-flex justify-content-between">
                                <p class="mb-2">Sub Total</p>
                                <p class="mb-2">{cart.totalPrice}</p>
                              </div>

                              <div class="d-flex justify-content-between">
                                <p class="mb-2">Shipping</p>
                                <p class="mb-2">20.00</p>
                              </div>

                              <div class="d-flex justify-content-between mb-4">
                                <p class="mb-2">Total(Incl. taxes)</p>
                                <p class="mb-2">{cart.totalPrice + 20.0}</p>
                              </div>

                              <button
                                type="button"
                                class="btn btn-info btn-block btn-lg"
                                style={{backgroundColor:"black" , marginLeft:"50px"}}
                              >
                                <div class="d-flex justify-content-between"
                                style={{color:"white"}}
                                >
                                  <span onClick={goToCheckout}>
                                    Checkout
                                    <i class="fas fa-long-arrow-alt-right ms-2"></i>
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Cart;
