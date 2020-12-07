const express = require("express");
const router = express.Router();
const {
  musicList,
  musicCreate,
  fetchMusic,
  ukuleleCreate,
} = require("../controllers/musicController");
const upload = require("../middleware/multer");

//Routes

router.param("musicId", async (req, res, next, musicId) => {
  const music = await fetchMusic(musicId, next);
  if (music) {
    req.music = music;
    next();
  } else {
    const err = new Error("Music Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", musicList);

router.post("/", upload.single("image"), musicCreate);
router.post("/:musicId/ukuleles", upload.single("image"), ukuleleCreate);

module.exports = router;
