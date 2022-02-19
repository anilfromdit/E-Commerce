const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//Importing Routes 
const products = require("./routes/productRoute")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")
const offers = require("./routes/offerRoute")
app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", offers);

//Middleware for errors
app.use(errorMiddleware);

module.exports = app