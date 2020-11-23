const express = require("express");
const cors = require("cors");
const ukuleleRoutes = require("./routes/ukulele");
const bodyParser = require("body-parser");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/products", ukuleleRoutes);

app.listen(8000, () => {
  console.log(" the application is running on localhost:8000");
});
