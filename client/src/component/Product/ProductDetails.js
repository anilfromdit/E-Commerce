import React, { Fragment, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader.js"
import {useAlert} from "react-alert"


const ProductDetails = () => {
  

 

  const submitReviewToggle = () => {
    // open ? setOpen(false) : setOpen(true);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();


  const { product, loading, error } = useSelector((state) => state.productDetails);

  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:product.ratings,
    isHalf:true,
    size:window.innerWidth<600?20:25,
}; 

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);

  return (
    <Fragment>
      {
        loading?<Loader/>:<Fragment>
        <div className="ProductDetails">
          <div className='carouselWrapper'>
            <Carousel className='myCarousel'
              autoPlay={true}
              showArrows={false}
              infiniteLoop={true}
              stopOnHover={false}
              showThumbs={true}
              showStatus={false}
              showIndicators={true}
            >
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
    
                ))}
            </Carousel>
          </div>
    
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
    
            <div className='detailsBlock-3'>
              <h1> &#x20B9; {`${product.price}`} </h1>
              <div className='detailsBlock-3-1'>
                <div className='detailsBlock-3-1-1'>
                  <button>-</button>
                  <input value={1} type="number" />
                  <button>+</button>
                </div>
                <button>Add to cart</button>
              </div>
    
              <p>Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
    
            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>
            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
    
          </div>
    
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
    
        {product.reviews && product.reviews[0] ? (
          <div className='reviews'>
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review}/> )}
            </div>
        ) : (
          <p className='noReviews'>No Reviews Yet</p>
        )
        }
    
      </Fragment>
      }
    </Fragment>
  );

};

export default ProductDetails;