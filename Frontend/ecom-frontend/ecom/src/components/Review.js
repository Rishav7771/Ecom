import React from 'react'
import { Button } from 'react-bootstrap';

const Review = ({product}) => {
  return (
    <section>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 col-xl-8 text-center">
        <h3 class="mb-4">Ratings & Reviews</h3>
      </div>
    </div>
  
    <div class="row text-center">
      <div class="col-md-4 mb-5 mb-md-0">
        <div class="d-flex justify-content-center mb-4">
          <img src="https://images.media.io/images2023/ai-portrait-generator/portrait-pic1.png"
            class="rounded-circle shadow-1-strong" width="150" height="150" />
        </div>
        <h5 class="mb-3">{product.reviews[0].name}</h5>
        <p class="px-xl-3">
        <Button variant="success" className='catalogButton' style={{marginBottom:"7px"}}>
                {product.reviews[0].rating}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" style={{marginBottom:"2px"}}></img>
                </Button>
        </p>
        <p class="px-xl-3">
          <i class="fas fa-quote-left pe-2"></i>{product.reviews[0].comment}
        </p>
        <ul class="list-unstyled d-flex justify-content-center mb-0">
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star-half-alt fa-sm text-warning"></i>
          </li>
        </ul>
      </div>
      <div class="col-md-4 mb-5 mb-md-0">
        <div class="d-flex justify-content-center mb-4">
          <img src="https://images.media.io/images2023/ai-portrait-generator/portrait-pic2.png"
            class="rounded-circle shadow-1-strong" width="150" height="150" />
        </div>
        <h5 class="mb-3">{product.reviews[1].name}</h5>
        <p class="px-xl-3">
        <Button variant="success" className='catalogButton' style={{marginBottom:"7px"}}>
                {product.reviews[1].rating}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" style={{marginBottom:"2px"}}></img>
                </Button>
        </p>
        <p class="px-xl-3"></p>
        <p class="px-xl-3">
          <i class="fas fa-quote-left pe-2"></i>{product.reviews[1].comment}
        </p>
        <ul class="list-unstyled d-flex justify-content-center mb-0">
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
        </ul>
      </div>
      <div class="col-md-4 mb-0">
        <div class="d-flex justify-content-center mb-4">
          <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/327125394/original/33993896886462d3c618c2b8d827a109996becc7/professional-ai-avatar-shorts-video-creation.jpg"
            class="rounded-circle shadow-1-strong" width="150" height="150" />
        </div>
        <h5 class="mb-3">{product.reviews[2].name}</h5>
        <p class="px-xl-3">
        <Button variant="success" className='catalogButton' style={{marginBottom:"7px"}}>
                {product.reviews[2].rating}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" style={{marginBottom:"2px"}}></img>
                </Button>
        </p>
        <p class="px-xl-3"></p>
        <p class="px-xl-3">
          <i class="fas fa-quote-left pe-2"></i>{product.reviews[2].comment}
        </p>
        <ul class="list-unstyled d-flex justify-content-center mb-0">
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="fas fa-star fa-sm text-warning"></i>
          </li>
          <li>
            <i class="far fa-star fa-sm text-warning"></i>
          </li>
        </ul>
      </div>
    </div>
    </section>
  )
}

export default Review