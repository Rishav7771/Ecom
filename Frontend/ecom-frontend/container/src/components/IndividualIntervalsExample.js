import Carousel from 'react-bootstrap/Carousel';
import First from '../assets/images/first.jpg';
import Second from '../assets/images/second.jpg';
import Third from '../assets/images/third.jpg';
import '../styles/carousel.css'
import { useNavigate } from 'react-router-dom';

function IndividualIntervalsExample() {
  const navigate = useNavigate();

  const goToProductDetail = (id) => {
      navigate(`/products/${id}`);
    };
  return (
    <Carousel className='carousel'>
      <Carousel.Item interval={1000} onClick={() => goToProductDetail('65e6ba14d28de0572dbc04b9')}>
        <img src="https://images.samsung.com/is/image/samsung/assets/in/home/Neo_Qled_8K_Without-Text_1440X6401.jpg?imwidth=1536" style={{width:"1650px" , height:"550px"}}></img>
        <Carousel.Caption>
          <h3>Neo QLED 8K</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} onClick={() => goToProductDetail('65e6bcf1d28de0572dbc04ba')} >
      <img src="https://images.samsung.com/is/image/samsung/assets/in/home/banner_DT_1440x640.jpg?imwidth=1536" style={{width:"1650px" , height:"550px"}} ></img>
        <Carousel.Caption>
          <h3>Galaxy Book4 Pro 360</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={() => goToProductDetail('65e6c050d28de0572dbc04bb')}>
      <img src="https://image01.realme.net/general/20231212/170236881385044889b8cc5c34b53a9e9826b94d55912.jpg.webp"  style={{width:"1650px" , height:"550px"}}></img>
        <Carousel.Caption>
 
          <h3>realme narzo 60x 5G</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;