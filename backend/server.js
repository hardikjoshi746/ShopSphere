const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(express.json()); // to parse the incoming requests with the json data
app.use(cookieParser()); // to parse the incoming requests with the cookies
app.use(fileUpload()); // to parse the incoming requests with the files

app.use(
  cors({
    origin: "https://shop-sphere-khaki.vercel.app", // your frontend URL
    credentials: true,
  })
);

app.get("/", async (req, res, next) => {
  res.json({ message: "API Running..." });
});

const connectDB = require("./config/db");

connectDB();
app.use("/api", apiRoutes);

app.get("/api/products/", (req, res) => {
  res.send("Handeling Product Routing");
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
