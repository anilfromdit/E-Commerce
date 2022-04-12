const app = require("./app");

const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
//handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log(`Error:${error.message}`);
  console.log("Shutting down server due to uncaught promise rejection");

  process.exit(1);
});

// dotenv config
if(process.env.NODE_ENV !=="PRODUCTION"){
  require("dotenv").config({ path: "backend/config/config.env" });
}
//Connecting to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//handling unhandled Promise Rejection

process.on("unhandledRejection", (error) => {
  console.log(`Error:${error.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
