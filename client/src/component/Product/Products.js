import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import ClearIcon from '@mui/icons-material/Clear';
import MetaData from "../layout/MetaData";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const categories = [
  "Computers and Accessories",
  "Furniture",
  "Jewelry",
  "Pet supplies",
  "Home Decor",
  "Health and Personal Care",
  "Kitchen supplies",
  "Men's Fashion",
  "Ladies Fashion",
  "Kid's Fashion",
  "Mobiles and Tablets",
  "Electronics",
  "Books",
  "Baby Products",
  "Chocolates",
  "Eye Wear",
];
const prices = [
  "0-5000",
  "5000-15000",
  "15000-30000",
  "30000-60000",
  "60000-150000"
]

const stars=[
  1,2,3,4,5
]
const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();
  const { offer } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (nPrice) => {
    const newPrice =JSON.stringify(nPrice.price).split("-");
     const min= (parseInt( newPrice[0].replace(`"`,""),10))
     const max= (parseInt( newPrice[1].replace(`"`,""),10))
    setPrice([min,max]);
    dispatch(getProduct(keyword, currentPage, price, category, ratings, offer));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings, offer));
  }, [
    dispatch,
    keyword,
    price,
    currentPage,
    category,
    ratings,
    alert,
    error,
    offer,
  ]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ?
        <Loader />
        :
        <Fragment>
          <MetaData title="Products | E-Mart" />
          <h2 className="productsHeading">Products</h2>
<div className="filterBox">

          <div className="sec-center">
            <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
            <label className="for-dropdown" for="dropdown">Categories <ArrowDropDownIcon className="uil" /> </label>
            <div className="section-dropdown">
              <ul>
                <li
                  className="category-link textRight"

                  onClick={() => setCategory()}
                >
                  <ClearIcon
                    style={{
                      color: "red",
                      transform: " translateY(7px) scale(0.8)"
                    }} />
                  {"Clear All"}
                </li>
                {categories.map((category) => (
                  <li className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sec-center">
            <input className="dropdownForPrice" type="checkbox" id="dropdownForPrice" name="dropdownForPrice" />
            <label className="for-dropdownForPrice" for="dropdownForPrice">Price <ArrowDropDownIcon className="uil" /> </label>
            <div className="section-dropdownForPrice">
              <ul>
                <li
                  className="category-link textRight"
                  onClick={() => setPrice([0,250000])}
                >
                  <ClearIcon
                    style={{
                      color: "red",
                      transform: " translateY(7px) scale(0.8)"
                    }} />
                  {"Clear All"}
                </li>
                {prices.map((price) => (
                  <li className="category-link"
                    key={price}
                    onClick={()=>priceHandler({price})}
                  >
                    {price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          

          <div className="sec-center">
            <input className="dropdownForRating" type="checkbox" id="dropdownForRating" name="dropdownForRating" />
            <label className="for-dropdownForRating" for="dropdownForRating">Rating <ArrowDropDownIcon className="uil" /> </label>
            <div className="section-dropdownForRating">
              <ul>
                <li
                  className="category-link textRight"
                  onClick={() => setRatings(0)}
                >
                  <ClearIcon
                    style={{
                      color: "red",
                      transform: " translateY(7px) scale(0.8)"
                    }} />
                  {"Clear All"}
                </li>
                {stars.map((star) => (
                  <li className="category-link"
                    key={star}
                    onClick={()=>setRatings(star)}
                  >
                    {star}
                  </li>
                ))}

              </ul>
            </div>
          </div>

          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {/* <div className="filterBox">
            <div className="border">
              <Typography>Price</Typography>
              <Slider
                size="large"
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={150000}
              />
            </div>
            <div className="categoryBox">
              <Typography component="legend">Categories</Typography>
              <ul>
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border">
              <Typography>Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </div>
          </div> */}

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClassName="page-item"
                linkClassName="page-link"
                activeClassName="pageItemActive"
                activeLinkClassName="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      }
    </Fragment >
  );
};

export default Products;
