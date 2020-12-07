const express = require("express");
const router = express.Router();
const {
  ukuleleList,
  ukuleleDelete,
  ukuleleCreate,
  ukuleleUpdate,
  fetchUkulele,
} = require("../controllers/ukuleleController");
const upload = require("../middleware/multer");

//Routes

router.param("ukuleleId", async (req, res, next, ukuleleId) => {
  const ukulele = await fetchUkulele(ukuleleId, next);
  if (ukulele) {
    req.ukulele = ukulele;
    next();
  } else {
    const err = new Error("Ukulele Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", ukuleleList);

router.delete("/:ukuleleId", ukuleleDelete);

router.put("/:ukuleleId", upload.single("image"), ukuleleUpdate);

module.exports = router;
