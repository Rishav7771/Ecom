import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" , backgroundColor:"#C7C8CC" }}>
      
      <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container" style={{ border:"3px solid black" , borderRadius:"3%" , backgroundColor:"white"}}>
        {/* <img src={errorPage} alt="Error Page" style={{ width: "100%", height: "100%" }} /> */}
          <div class="row">
            <div class="col-12">
              <div class="text-center">
                <h3 class="h2 mb-2">Oops! You're lost.</h3>
                <p class="mb-5">The Product you are looking for is not there.</p>
                {/* <a class="btn bsb-btn-5xl btn-dark rounded-pill px-5 py-2 mb-3 fs-6 m-0"  role="button" onClick={goToHome}>Back to Home</a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  )
}

export default ErrorPage