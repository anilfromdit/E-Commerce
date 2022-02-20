import React from 'react';
import {Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"


const ProductCard = ({product}) => {
  
  const options={
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      value:product.ratings,
      isHalf:true,
      size:window.innerWidth<600?20:35,
  };
  return (
<Link className='productCard' to={`/product/${product._id}`}>

    {/* <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>

<span>&#x20B9;{product.price}</span> */}
<div className="items-container">
  <div className="item">
    <div className="diamond-container">
      <div className="diamond">
        <div className="diamond-wrapper">
          <div  className="diamond-content">&#x20B9;{product.price}</div>
        </div>
      </div>
    </div>

    <div className="item-wrapper">
      <div className="content-wrapper">
        <div className="img-container">
          <div className="bg-square"></div>
          <img className="item-img" src={product.images[0].url} alt={product.name} />
        </div>

        <div className="content-text">
          <div className="item-name">{product.name}</div>
        </div>
      </div>
      <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
    <ReactStars {...options}/> <span>({product.numOfReviews})</span>
</div>
      <div className="view-more-btn">View </div>
      
    </div>
  </div>
  </div>

</Link>
  );
};

export default ProductCard;