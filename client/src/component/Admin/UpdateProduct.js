import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SellIcon from '@mui/icons-material/Sell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [mrp, setMRP] = useState(0);
  const [warranty, setWarranty] = useState("");
  const [brand, setBrand] = useState("");
  const [offer, setOffer] = useState("");
  const [longProductDescription, setLongProductDescription] = useState("")
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Footwear",
    "Bottom",
    "Tops",
    "Camera",
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
    "Other",
  ];
  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setMRP(product.mrp);
      setWarranty(product.warranty);
      setBrand(product.brand);
      setOffer(product.offer);
      setLongProductDescription(product.longProductDescription);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      window.location.href='/admin/products'
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,alert,error,isUpdated,id,product,updateError]);


  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("mrp", mrp);
    myForm.set("warranty", warranty);
    myForm.set("brand", brand);
    myForm.set("offer", offer);
    myForm.set("longProductDescription", longProductDescription);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id,myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <BusinessIcon style={{ color: "#4141b1" }} />
              <input
                type="text"
                placeholder="Brand Name"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupeeIcon style={{ color: "green" }} />
              <input
                type="number"
                placeholder="MRP"
                required
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
              />
            </div>

            <div>
              <SellIcon style={{ color: "#dcdc24e3" }} />
              <input
                type="number"
                placeholder="our price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>


            <div>
              <DescriptionIcon style={{ color: "#4141b1" }} />

              <textarea
                placeholder="Product Short Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>

            </div>
            <div>
              <DescriptionIcon style={{ color: "#4141b1" }} />
              <textarea
                placeholder="Product Long Description"
                value={longProductDescription}
                onChange={(e) => setLongProductDescription(e.target.value)}
                cols="50"
                rows="1"
              ></textarea>
            </div>
            <div>
              <CheckCircleIcon style={{ color: "green" }} />
              <input
                type="text"
                placeholder="Warranty"
                required
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon style={{ color: "#4141b1" }} />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value=""></option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <LocalOfferIcon style={{ color: "#2c977e" }} />
              <input
                type="text"
                placeholder="offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>


            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>

  )
}

export default UpdateProduct