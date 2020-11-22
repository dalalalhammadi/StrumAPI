const express = require("express");
const cors = require("cors");
let products = require("./products");
const bodyParser = require("body-parser");
const app = express();
const slugify = require("slugify");

//Middleware
app.use(cors());
app.use(bodyParser.json());

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
  if (foundUkulele) {
    products = products.filter((ukulele) => ukulele !== foundUkulele);
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "Ukulele not found" });
  }
});
app.post("/products", (req, res) => {
  const id = products[products.lenth - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newUkulele = { id, slug, ...req.body };
  products.push(newUkulele);
  res.status(201).json(newUkulele);
});

app.put("/products/:ukuleleId", (req, res) => {
  const { ukuleleId } = req.params;
  const foundUkulele = products.find((ukulele) => ukulele.id === +ukuleleId);
  if (foundUkulele) {
    for (const key in req.body) foundUkulele[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "ukulele not found" });
  }
});

app.listen(8000, () => {
  console.log(" the application is running on localhost:8000");
});
