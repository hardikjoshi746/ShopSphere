const express = require("express");
const app = express();
const port = 3001;
const apiRoutes = require("./routes/apiRoutes");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(express.json()); // to parse the incoming requests with the json data
app.use(cookieParser()); // to parse the incoming requests with the cookies
app.use(fileUpload()); // to parse the incoming requests with the files

app.get("/", async (req, res, next) => {
  res.json({ message: "API Running..." });
});

const connectDB = require("./config/db");

connectDB();
app.use("/api", apiRoutes);

app.get("/api/products/", (req, res) => {
  res.send("Handeling Product Routing");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
