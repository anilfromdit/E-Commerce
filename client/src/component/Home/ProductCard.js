import React from "react";
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };


  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="items-container">
        <div className="item">
          <div className="diamond-container">
            <div className="diamond">
              <div className="diamond-wrapper">
                <div className="diamond-content">&#x20B9;{product.price}</div>
              </div>
            </div>
          </div>

          <div className="item-wrapper">
            <div className="content-wrapper">
              <div className="img-container">
                <div className="bg-square"></div>
                <img
                  className="item-img"
                  src={product.images[0].url}
                  alt={product.name}
                />
              </div>

              <div className="content-text">
                <div className="item-name">{product.name}</div>
              </div>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Rating {...options} /> <span>({product.numOfReviews})</span>
            </div>
            <div className="view-more-btn">View </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
