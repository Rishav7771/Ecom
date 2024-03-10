import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/images/Logo.svg';
import user from '../assets/images/user.png';
import boy from '../assets/images/boy.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyModal from './Modal';
import DropdownUser from './DropdownUser';
import ErrorComponent from './ErrorComponent';

const Header = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async (category) => {
    try {
      setIsLoading(true); 
      const response = await axios.get(`http://localhost:8081/products/category/${category}`);
      setProducts(response.data);
      console.log(products);
      setModalShow(true); 
    } catch (error) {
      console.error("Error fetching products:", error);
      if (!error.response) { 
        setError("maintenance"); 
      } else if (error.response.status !== 500) { 
        setError(error.response.status); 
      } else {
        setError(true); 
      }
    }finally {
      setIsLoading(false);
    }
  };

  const goToProductDetail = () => {
    navigate(`/products`);
  };

  const goToHome = () => {
    navigate(`/`);
  };

  const handleNavClick = (category) => {
    setSelectedCategory(category);
    navigate("/products", {state : {category}});
  };

  return ( error ? (
    <ErrorComponent message={ 
      error === "maintenance" ? "Site Under Maintenance" : 
        error === true ? "Internal Server Error" : 
          `Error: ${error}` 
    } />
  ) :
    <div style={{backgroundColor:"black"}} className='header'>
      <Navbar   data-bs-theme="light" className="custom-navbar">
        <div className="logo">
          <Navbar.Brand  onClick={goToHome}>
            <img
              src="https://i.pinimg.com/564x/e5/5e/64/e55e6435dde1fe7e6acf7f804f3e4b0c.jpg"
              width="100"
              height="60"
              className="d-inline-block align-top logo"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </div>
        <div className="nav-links text-uppercase">
          <Nav.Link onClick={() => handleNavClick('SmartPhone')} className="nav-cat">
            SmartPhone
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('TV&AV')} className="nav-cat">
            TV&AV
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('Watch')} className="nav-cat">
            Watch
          </Nav.Link>
          <Nav.Link onClick={() => handleNavClick('HeadPhones')} className="nav-cat">
            HeadPhones
          </Nav.Link>
          <Nav.Link onClick={goToProductDetail} className="nav-cat">
            Products
          </Nav.Link>
        </div>
        <Navbar.Brand  onClick={() => setProfile((prev) => !prev)}>
          <img
            src="data:image/png;base64,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"
            width="30"
            height="30"
            className="d-inline-block align-top profile"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        {profile && <DropdownUser setProfile={setProfile} />}
      </Navbar>
      <MyModal show={modalShow} onHide={() => setModalShow(false)} products={products} isLoading={isLoading} />
    </div>
  );
};

export default Header;