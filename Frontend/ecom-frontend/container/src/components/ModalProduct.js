import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const ModalProduct = ({ show, onHide , isLoading ,setTriggerFetch}) => {
    const [newProductData, setNewProductData] = useState({
        name: '',
        image: [],
        brand:'',
        description:[],
        quantity:0,
        price:0.0,
        category:'',
      });
      const handleChange = (event) => {
        if (event.target.name === 'quantity') {
          setNewProductData({
            ...newProductData,
            [event.target.name]: parseInt(event.target.value),
          });
        } else if (event.target.name === 'price') {
          setNewProductData({
            ...newProductData,
            [event.target.name]: parseFloat(event.target.value), 
          });
        }
          else if (event.target.name === 'image') {
          setNewProductData({
            ...newProductData,
            [event.target.name]: event.target.value.split(','),
          });
        } 
        else if (event.target.name === 'description') {
          setNewProductData({
            ...newProductData,
            [event.target.name]: event.target.value.split(','),
          });
        } else {
          setNewProductData({
            ...newProductData,
            [event.target.name]: event.target.value,
          });
        }
      };
    
    const handleAddProduct = async () => {
        try {
          const response = await axios.post('http://localhost:8081/products', newProductData); 
          console.log(response.data);
          setProducts([...products, response.data]); 
          setIsAddProductFormOpen(false); 
          setTriggerFetch((current) => !current);
          setNewProductData({ ...newProductData, 
            name: '',
            image: [],
            brand:'',
            description:[],
            quantity:0,
            price:0.0,
            category:'',
          });
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton  style={{backgroundColor:"black", color:"white"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          {isLoading ? 'Loading Products...' : 'Add Product'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
      <form>
      <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={newProductData.name}
              onChange={handleChange}
              name="name" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Image Url</label>
            <input
              type="text"
              className="form-control"
              id="image"
              value={newProductData.image}
              onChange={handleChange}
              name="image" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              value={newProductData.brand}
              onChange={handleChange}
              name="brand" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={newProductData.description}
              onChange={handleChange}
              name="description" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              value={newProductData.quantity}
              onChange={handleChange}
              name="quantity" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={newProductData.price}
              onChange={handleChange}
              name="price" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={newProductData.category}
              onChange={handleChange}
              name="category" 
            />
          </div>
  <button type="button" class="btn btn-primary" onClick={()=>handleAddProduct()} 
   style={{marginTop:"5px" , backgroundColor:"black"}}
  >Submit</button>
</form>
      </Modal.Body>
      <Modal.Footer>
        <Button  style={{backgroundColor:"black"}} onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProduct;