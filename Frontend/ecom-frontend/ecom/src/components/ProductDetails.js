import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ProductCatalog.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleProductCard from './SingleProductCard';
import SingleProductDescription from './SingleProductDescription';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Rating from './Rating';
import Review from './review';
import ErrorPage from './ErrorPage';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  

  const [singleproduct, setSingleProduct] = useState([]);
  const [primeImage, setPrimeImage] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); 

  const fetchSingleProduct = async () => {
    try {
      const id = params.id;
      const response = await axios.get(`http://localhost:8081/products/${id}`);
      setSingleProduct(response.data);
      setLoading(false);
      setPrimeImage(response.data.image[0]);

      const cat = response.data.category;
      const response1 = await axios.get(`http://localhost:8081/products/category/${cat}`);
      setProducts(response1.data); // Set products after both responses are received
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      if (!error.response) { 
        setError("maintenance"); 
      } else if (error.response.status !== 500) { 
        setError(error.response.status); 
      } else {
        setError(true); 
      }
    }
  };

  const goToProduct = (id) => {
    // console.log(id);
    navigate(`/products/${id}`);
  };

  const handleChangePrimeImage = (imageUrl) => {
    setPrimeImage(imageUrl);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [params]);

  return ( error ? (
    <ErrorPage message={ 
      error === "maintenance" ? "Site Under Maintenance" : 
        error === true ? "Internal Server Error" : 
          `Error: ${error}` 
    } />
  ): 
    <div className="mt-4">
      {singleproduct && singleproduct.image && (
        <Container fluid={true}>
         <Row style={{width:"100vw" }}>
           <Col sm={7}>
           <div style={{display:"flex" , justifyContent:"center"}}>
         <img src={primeImage} width="500px" style={{height:"70vh"}}></img>
         </div>
         <br /><br/>
        <div style={{width:"100%" , display:"flex" , justifyContent:"space-evenly"}}>
          <img className='img-hover' src = {singleproduct.image[1]} width="100px" height="100px"   onMouseEnter={() => handleChangePrimeImage(singleproduct.image[1])} onMouseLeave={()=> handleChangePrimeImage(singleproduct.image[0])}></img>
          <img className='img-hover' src = {singleproduct.image[2]} width="100px" height="100px"   onMouseEnter={() => handleChangePrimeImage(singleproduct.image[2])} onMouseLeave={()=> handleChangePrimeImage(singleproduct.image[0])}></img>
          <img className='img-hover' src = {singleproduct.image[3]} width="100px" height="100px"   onMouseEnter={() => handleChangePrimeImage(singleproduct.image[3])} onMouseLeave={()=> handleChangePrimeImage(singleproduct.image[0])}></img>
          </div>
           </Col>
           <Col sm={5}> <SingleProductDescription details = {singleproduct}/> </Col>
      </Row>

            <div style={{marginTop:"50px"}}>{singleproduct.reviews.length > 2?<Review product = {singleproduct}/>:<></>}</div>

          <div style={{ paddingTop: '80px' }}>
            <h1 style={{ textAlign: 'center' ,fontFamily:"Noto Sans" , fontWeight:"620"}}>More In This Category</h1>
          </div>

          {products.length > 0 && (
            <Row className='pdp-row mb-4' style={{justifyContent:"center",marginTop:"50px"}}>
              {products.slice(0,3).map((product) => (
                <Col xs={6} md={3} className='pdp-img' key={product.id}>
                 <div class="card border-0 rounded-0 shadow" style={{height:"362.88px",width: "18rem"}} onClick={()=>goToProduct(product.id)}>
    <img src={product.image[0]} style={{height:"160px",width:"190px",margin:"0 auto"}} class="card-img-top rounded-0" alt="..."/>
    <div class="card-body mt-3 mb-3">
        <div class="row">
            <div class="col-10">
                <Button variant="success" className='catalogButton' style={{marginBottom:"7px"}}>
                <Rating product={product}></Rating>
                </Button>
                <h4 class="card-title">{product.name}</h4>
                <p><b>{product.price}</b></p>
            </div>
            <div class="col-2">
                <i class="bi bi-bookmark-plus fs-2"></i>
            </div>
        </div>
    </div>
    <div class="row align-items-center text-center g-0">
        <div class="col-8">
            <p style={{backgroundColor:"black" , color:"#FFC300",padding:"8px 0",margin:"0",width:"288px",fontWeight:"12px"}}><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
            style={{margin:"0px 5px 7px 0px"}}
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg> ADD TO CART</p>
        </div>
    </div>
</div> 
                </Col>
              ))}
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default ProductDetails;
    