const express = require("express");
const mongoose = require("mongoose");
const talentsRouter = require("./routes/talentsRouter");
const talents = require("./__test__/test_talents");

const app = express();

/**
 * Express settings
 */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

/**
 * Index Routing
 */
app.get("/", (req, res) => {
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
