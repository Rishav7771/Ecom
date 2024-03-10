import React from 'react'
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const goToProductDetail = () => {
        navigate(`/products`);
      };
  return (
    <div class="container mt-4 mb-4">
    <div class="row d-flex cart align-items-center justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="d-flex justify-content-center border-bottom">
                    <div class="p-3">
                        <div class="progresses">
                            <div class="steps"> <span><i class="fa fa-check"></i></span> </div> <span class="line"></span>
                            <div class="steps"> <span><i class="fa fa-check"></i></span> </div> <span class="line"></span>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-md-6 border-right p-5">
                        <div class="text-center order-details">
                            <div class="d-flex justify-content-center mb-5 flex-column align-items-center"> <span class="check1"><i class="fa fa-check"></i></span> <b><span class="font-weight-bold" style={{fontWeight:"200px"}}>Order Confirmed</span> </b><small class="mt-2">Your illustraion will go to you soon</small></div> <button class="btn btn-danger btn-block order-button" style={{backgroundColor:"black"}} onClick={goToProductDetail}>Browse More Products</button>
                        </div>
                    </div>
                    <div class="col-md-6 background-muted">
                        <div class="row g-0 border-bottom">
                            <div class="col-md-6 border-right">
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                        <div class="row g-0 border-bottom">
                            <div class="col-md-6">
                            </div>
                            <img src='https://s3-ap-southeast-1.amazonaws.com/easystore.website/images/landing-page/telegram/step-3.jpg' style={{width:"520px" , height:"520px"}}></img>
                            <div class="col-md-6">
                            </div>
                        </div>
                        <div class="row g-0 border-bottom">
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                        <div class="row g-0">
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                    </div>
                </div>
                <div> </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Checkout