import React from 'react'
import { useNavigate } from 'react-router-dom';


const ErrorComponent = () => {
    const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/`);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" , backgroundColor:"#C7C8CC" }}>
      
    <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container" style={{border:"5px solid black" , borderRadius:"3%" , backgroundColor:"white"}}>
      <img src="https://media.istockphoto.com/id/494477790/vector/cartoon-technicians-helping-broken-smartphone.jpg?s=612x612&w=0&k=20&c=9n-Yi4T2pIpxctbhfxKG3AXJMCLgNNqT13RLYDkz5xM=" alt="Error Page" style={{ width: "250px", height: "250px" ,marginLeft:"43px"}} />
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span class="display-1 fw-bold">5</span>
                <i class="bi bi-exclamation-circle-fill text-danger display-4"></i>
                <span class="display-1 fw-bold">0</span>  {/* Add the missing zero */}
                <span class="display-1 fw-bold bsb-flip-h">0</span>
              </h2>
              <h3 class="h2 mb-2">Site Under Maintenance</h3>
              <p class="mb-5">We Will Be Back Soon!</p>
              <a class="btn bsb-btn-5xl btn-dark rounded-pill px-5 py-2 mb-3 fs-6 m-0"  role="button" onClick={goToHome}>Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default ErrorComponent