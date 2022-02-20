import React from 'react';
import {Link } from "react-router-dom"
// import ReactStars from "react-rating-stars-component"


const ProductCard = ({product}) => {
  
  // const options={
  //     edit:false,
  //     color:"rgba(20,20,20,0.1)",
  //     activeColor:"tomato",
  //     value:product.ratings,
  //     isHalf:true,
  //     size:window.innerWidth<600?20:25,
  // };
  return (
<Link className='productCard' to={`/product/${product._id}`}>

    {/* <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>
<div>
    <ReactStars {...options}/> <span>({product.numOfReviews} Reviews)</span>
</div>
<span>&#x20B9;{product.price}</span> */}
<div class="items-container">
  <div class="item">
    <div class="diamond-container">
      <div class="diamond">
        <div class="diamond-wrapper">
          <div class="diamond-content">&#x20B9;{product.price}</div>
        </div>
      </div>
    </div>

    <div class="item-wrapper">
      <div class="content-wrapper">
        <div class="img-container">
          <div class="bg-square"></div>
          <img class="item-img" src={product.images[0].url} alt={product.name} />
        </div>

        <div class="content-text">
          <div class="item-name">{product.name}</div>
        </div>
      </div>
      <div class="view-more-btn">View </div>
      
    </div>
  </div>
  </div>

</Link>
  );
};

export default ProductCard;