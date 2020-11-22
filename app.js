const express = require("express");
const cors = require("cors");
let products = require("./products");

const app = express();

//Middleware
app.use(cors());

//Routes
app.get("/", (request, response) => {
  console.log("Helooo");
  response.json({ message: "hiii" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:ukuleleId", async (req, res) => {
  const { ukuleleId } = req.params;
  const foundUkulele = products.find((ukulele) => ukulele.id === +ukuleleId);
  if (foundUkluele) {
    products = products.filter((ukulele) => ukulele !== foundUkulele);
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "Ukulele not found" });
  }
});

app.listen(8000, () => {
  console.log(" the application is running on localhost:8000");
});
