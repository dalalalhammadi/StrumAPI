const express = require("express");
const router = express.Router();
const {
  ukuleleList,
  ukuleleDelete,
  ukuleleCreate,
  ukuleleUpdate,
} = require("../controllers/ukuleleController");

//Routes

router.get("/", ukuleleList);

router.delete("/:ukuleleId", ukuleleDelete);

router.post("/", ukuleleCreate);

router.put("/:ukuleleId", ukuleleUpdate);

module.exports = router;
