import React from 'react'

const Rating = ({product}) => {
  return (
   

        <div class="d-flex gap-1 ratingstext-center">

          <span class="product-rating" style={{fontSize:"12px",fontWeight:"700"}}>{product.rating}</span>

          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" style={{marginTop:"2px",height:"12px",width:"12px"}}></img>
        </div>

  )
}

export default Rating