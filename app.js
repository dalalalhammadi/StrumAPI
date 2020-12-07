const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const ukuleleRoutes = require("./routes/ukulele");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const MusicRoutes = require("./routes/music");
const userRoutes = require("./routes/users");

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);

//routes
app.use("/musics", MusicRoutes);
app.use("/ukuleles", ukuleleRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// Not found path middleware
app.use((req, res, next) => {
  console.log("path not found");
  res.status(404).json({ message: "path not found" });
});

app.use((err, req, res, next) => {
  console.log("I'm an error handling middleware", err);
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8001, () => {
      console.log("The application is running on localhost:8001");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
