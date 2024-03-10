import React from "react";
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/products`);
  };

  const goToHome = () => {
    navigate(`/`);
  };

  const goToUserDetail = () => {
    navigate(`/user`);
    setProfile(false);
  };
  return (
    <div class="footer">
      <footer
        class="pt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          class="row d-flex flex-row flex-sm-row justify-content-between"
          style={{ width: "1200px" }}
        >
          <div class="col-3 col-md-2 mb-3 " style={{ textAlign: "left" }}>
            <h5>Visit</h5>
            <ul class="flex-column" className="div-list">
              <li class="nav-item mb-2" onClick={goToHome}>
                <a>Home</a>
              </li>
              <li class="nav-item mb-2" onClick={goToProductDetail}>
                <a>Products</a>
              </li>
              <li class="nav-item mb-2" onClick={goToUserDetail}>
                <a>Account</a>
              </li>
            </ul>
          </div>

          <div class="col-3 col-md-2 mb-3 ">
            <h5 className="top-text">About Us</h5>
            <p className="nav-item">
              Your one-stop shop for all things tech! We bring you top
              electronics, expert advice, and exceptional service.
            </p>
          </div>

          <div class="col-3 col-md-2 mb-3">
            <h5 className="top-text">Support</h5>
            <ul class="nav flex-column" className="div-list">
              <li class="nav-item mb-2">
                <a>Protection Plan</a>
              </li>
              <li class="nav-item mb-2">
                <a>Shopping FAQs</a>
              </li>
              <li class="nav-item mb-2">
                <a>User Manuals</a>
              </li>
              <li class="nav-item mb-2">
                <a>Service Centers</a>
              </li>
              <li class="nav-item mb-2">
                <a>Repair Service</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 col-md-2 mb-3 ">
            <h5 className="top-text">Contact Us</h5>
            <ul class="nav flex-column" className="div-list">
              <li class="nav-item mb-2 d-flex align-items-center">
                <a href="mailto:[[email address removed]]"><img src="https://img.icons8.com/?size=96&id=P7UIlhbpWzZm&format=png"
                height={"35px"} style={{marginRight:"8px"}}></img></a>
                <a href="https://www.linkedin.com/">
                </a>
                <a href="https://www.linkedin.com/"><img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                height={"35px"} style={{marginRight:"8px",margin:"10px 10px 10px 10px"}}></img></a>
                 <a href="https://help.instagram.com/372819389498306">
                </a>
                <a href="https://help.instagram.com/372819389498306">
                  <img src="https://cdn-icons-png.flaticon.com/128/174/174855.png"
                  height={"35px"} style={{marginRight:"8px",margin:"10px 10px 10px 10px"}}></img>
                </a>
              </li>
              <li class="nav-item mb-2 d-flex align-items-center">
                <a>B.I.T Gate Mesra , Ranchi 835217</a>{" "}
              </li>
            </ul>
          </div>

          <div class="d-flex flex-column flex-sm-row justify-content-center py-5 ">
            <p>© 2022 Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
