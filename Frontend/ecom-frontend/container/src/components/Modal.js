import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const MyModal = ({ show, onHide, products, isLoading }) => {
  const navigate = useNavigate();
  const goToProductDetail = (id) => {
    navigate(`/products/${id}`);
    onHide();
  };

  const productCards = products.slice(0, 5).map((product) => (
    <Col key={product.id} xs={6} md={4}>
      {/* Render your product card here */}
      <div onClick={() => goToProductDetail(product.id)}>
       <Col md-3>
       <img src={product.image[0]} alt={product.name} style={{height:"100px" , width:"100px"}}/>
        <p>{product.name}</p>
        <p>$ {product.price}</p></Col>
      </div>
    </Col>
  ));
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isLoading ? 'Loading Products...' : 'Products for Selected Category'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        {isLoading ? (
          <p>Fetching products, please wait...</p>
        ) : (
          <Container>
            <Row>{productCards}</Row>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} style={{backgroundColor:"black"}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;