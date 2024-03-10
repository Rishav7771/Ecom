import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/grid.css';

import {
    MDBContainer,
    MDBCol,
    MDBRow,
  } from 'mdb-react-ui-kit';

const Grid = () => {
      const navigate = useNavigate();

      const goToProductDetail = (id) => {
        navigate(`/products/${id}`);
      };
    
  return (
    <div className='container my-container'>
    <MDBRow className='grid'>
    <MDBCol lg={4} md={12} className='mb-4 mb-lg-0 first-row-img'>
    <img
          src='https://www.oneplus.in/content/dam/oasis/page/2023/global/product/larry-ar/images-design-mo-img-5-1.jpg.webp'
          className='w-100 shadow-1-strong rounded mb-4 img-grid animate-left-right object-fit-contain'
          alt='Boat on Calm Water'
          style={{boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)"}}
          onClick={() => goToProductDetail('65e6c22ad28de0572dbc04bc')}
        />

        <img
          src="https://image01-in.oneplus.net/ebp/202402/21/1-m00-52-99-cpgm7mxvqb2apuvaaafa4m3n8be890.png?x-amz-process=image/format"
          className='w-100 shadow-1-strong rounded mb-4 img-grid animate-left-right object-fit-contain'
          alt='Wintry Mountain Landscape'
          style={{height:"530px" ,boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)" }}
          onClick={() => goToProductDetail('65e6eaa5d28de0572dbc04c3')}
        />
   
    </MDBCol>

    <MDBCol lg={4} className='mb-4 mb-lg-0'>
      <img
        src='https://image01-in.oneplus.net/ebp/202307/12/1-m00-51-a0-cpgm7msuuvyazwdbaabn6jeaute513.png?x-amz-process=image/format'
        className='w-100 shadow-1-strong rounded mb-4 img-grid animate-left-right object-fit-contain'
        alt='Mountains in the Clouds'
        style={{height:"490px" , boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)"}}
        onClick={() => goToProductDetail('65e6e848d28de0572dbc04c2')}
      />

      <img
        src='https://www.apple.com/v/tv-home/k/images/overview/apple_tv_4k__b30wcqp0pdle_large_2x.jpg'
        className='w-100 shadow-1-strong rounded mb-4 img-grid animate-right-left object-fit-contain'
        alt='Boat on Calm Water'
        style={{boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)"}}
        onClick={() => goToProductDetail('65e6cd65d28de0572dbc04be')}
      />
    </MDBCol>

    <MDBCol lg={4} className='mb-4 mb-lg-0'>
      <img
        src='https://www.oneplus.in/content/dam/oasis/page/2023/in/home/oneplus-ecosystem/largecard.jpg.thumb.webp'
        className='w-100 shadow-1-strong rounded mb-4 img-grid animate-right-left object-fit-contain'
        alt='Waves at Sea'
        style={{boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)"}}
        onClick={() => goToProductDetail('65e6c859d28de0572dbc04bd')}
      />

      <img
        src='https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY23_X82L_HP_4span_D?$promotionTilesDesktop4span$&fmt=png-alpha'
        className='w-100 shadow-1-strong rounded mb-4 img-grid animate-right-left object-fit-contain'
        alt='Yosemite National Park'
        style={{height:"570px" , boxShadow:"0px 4px 8px rgba(0 , 0 , 0, 0.2)"  }}
        onClick={() => goToProductDetail('65e6ed87d28de0572dbc04c4')}
      />
    </MDBCol>
  </MDBRow>
  </div>
  )
}

export default Grid