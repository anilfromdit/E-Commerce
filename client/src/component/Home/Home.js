import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import Product from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import "./Home.css"
import Loader from "../layout/Loader/Loader.js"
import { useAlert } from 'react-alert';
import { getProduct,clearErrors } from '../../actions/productActions.js';
import { useSelector, useDispatch } from "react-redux"


const Home = () => {
  const alert= useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);


  return (
    <Fragment>
      {loading ? (<Loader/>) : (<Fragment>
        <MetaData title='E-mart | HOME' />
        <div className='banner'>
          <p>Welcome to E-Mart</p>
          <h1>Find Amazing Deals on Products Below</h1>
          <a href="#container">
            <button>Scroll<CgMouse /> </button>
          </a>      </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
          {products && products.map(product => (
            <Product product={product} />
          ))}
        </div>
      </Fragment>)}
    </Fragment>
  );
};

export default Home;
