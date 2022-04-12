const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// dotenv config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
  }
//Importing Routes
const products = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const offers = require("./routes/offerRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", offers);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname,"../client/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
})

//Middleware for errors
app.use(errorMiddleware);

module.exports = app;
