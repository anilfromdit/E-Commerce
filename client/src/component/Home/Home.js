import React, { Fragment, useEffect } from 'react';
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import "./Home.css"
import Loader from "../layout/Loader/Loader.js"
import { useAlert } from 'react-alert';
import { getProduct, clearErrors } from '../../actions/productActions.js';
import { useSelector, useDispatch } from "react-redux"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { getOffer } from '../../actions/offerAction.js';
import { margin } from '@mui/system';

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  const { offers } = useSelector((state) => state.offers);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
    dispatch(getOffer());
    
  }, [dispatch,error]);


  const style = {
    width:'100%',
    height:'40vh',
    alignItems: 'center',
    padding: '20px 10px',
    border:'2px solid black',
    boxSizing:'border-box',
    margin:'auto 0'

  };

  const properties = {

    duration: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    indicators: true,
    infinite: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Fragment>
      {loading ? (<Loader />) : (<Fragment>
        <MetaData title='E-mart | HOME' />



        <div>
          {offers?
          <Slide {...properties}>
            {offers && offers.map((offer) => (
              <img style={ style } key = { offer.name } src = { offer.image.url } alt = { offer.name } />
              ))}
          </Slide> 
          :
          <Loader/>
          // console.log("loading")
          }
        </div>

        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
          {products && products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </Fragment>)}
    </Fragment>
  );
};

export default Home;
