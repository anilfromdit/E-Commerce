const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")


app.use(express.json())
//Importing Routes 
const products = require("./routes/productRoute")
const user = require("./routes/userRoutes")

app.use("/api/v1",products);
app.use("/api/v1",user);

//Middleware for errors
app.use(errorMiddleware);

module.exports =app