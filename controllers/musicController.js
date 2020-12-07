const { Music, Ukulele } = require("../db/models");

exports.fetchMusic = async () => {
  try {
    const music = await Music.findByPk();
    return music;
  } catch (error) {
    next(error);
  }
};

exports.musicList = async (req, res, next) => {
  try {
    const ukuleles = await Music.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Ukulele,
        as: "ukuleles",
        attributes: ["id"],
      },
    });
    res.json(ukuleles);
  } catch (error) {
    next(error);
  }
};

exports.musicCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newMusic = await Music.create(req.body);
    res.status(201).json(newMusic);
  } catch (error) {
    next(error);
  }
};

exports.ukuleleCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newUkulele = await Ukulele.create(req.body);
    res.status(201).json(newUkulele);
  } catch (error) {
    next(error);
  }
};
