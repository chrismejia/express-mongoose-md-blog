const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Talent = require("./models/Talent");
const talentsRouter = require("./routes/talentsRouter");

const app = express();

/**
 * Express settings
 */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/**
 * Index Routing
 */
app.get("/", async (req, res) => {
  const talents = await Talent.find().sort({ debutDate: "desc" });
  res.render("talents/index", { talents });
});

/**
 * Router Mounts
 */
app.use("/talents", talentsRouter);

/**
 * Connections
 */
app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});

mongoose.connect("mongodb://localhost/holoproTalents", () => {
  console.log("Connected to holoproTalents DB!"),
    (err) => {
      console.error("holoproTalents DB error:");
      console.error(err);
    };
});
