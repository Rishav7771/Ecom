import React from 'react';
import Card from 'react-bootstrap/Card';
import '../style/ProductCatalog.css'; 
import { Button } from 'react-bootstrap'; 

const SingleProductCard = ({ product }) => {
  return (
    <Card className="my-4">
      <Card.Img variant="top" src={product?.image && product?.image[0]} alt={product.title} className='single-product'/> 
      <Card.Body>
        <Card.Title>{product.title}</Card.Title> 
        <Card.Text>{product.description}</Card.Text> 
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Price: Rs.{product.price}</strong> 
          </div>
        </div>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default SingleProductCard;