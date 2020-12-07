const { Ukulele } = require("../db/models");
const { Music } = require("../db/models");

exports.fetchUkulele = async (ukuleleId, next) => {
  try {
    const ukulele = await Ukulele.findByPk(ukuleleId);
    return ukulele;
  } catch (error) {
    next(error);
  }
};

exports.ukuleleList = async (req, res, next) => {
  try {
    const ukulelels = await Ukulele.findAll({
      attributes: { exclude: ["MusicId", "createdAt", "updatedAt"] },
      include: {
        model: Music,
        as: "music",
        attributes: ["name"],
      },
    });
    res.json(ukulelels);
  } catch (error) {
    next(error);
  }
};

exports.ukuleleDelete = async (req, res, next) => {
  try {
    await req.ukulele.destroy();
    res.status(204).end();
  } catch (ree) {
    next(err);
  }
};

exports.ukuleleUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.ukulele.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
