let products = require("../products");
const slugify = require("slugify");

exports.ukuleleList = (req, res) => {
  res.json(products);
};

exports.ukuleleDelete = (req, res) => {
  const { ukuleleId } = req.params;
  const foundUkulele = products.find((ukulele) => ukulele.id === +ukuleleId);
  if (foundUkulele) {
    products = products.filter((ukulele) => ukulele !== foundUkulele);
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "Ukulele not found" });
  }
};

exports.ukuleleCreate = (req, res) => {
  const id = products[products.lenth - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newUkulele = { id, slug, ...req.body };
  products.push(newUkulele);
  res.status(201).json(newUkulele);
};

exports.ukuleleUpdate = (req, res) => {
  const { ukuleleId } = req.params;
  const foundUkulele = products.find((ukulele) => ukulele.id === +ukuleleId);
  if (foundUkulele) {
    for (const key in req.body) foundUkulele[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "ukulele not found" });
  }
};
