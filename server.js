const express = require("express");
const mongoose = require("mongoose");
const talentsRouter = require("./routes/talentsRouter");
const talents = require("./__test__/test_talents");

const app = express();

mongoose.connect("mongodb://localhost/holoproTalents", () => {
  console.log("Connected to holoproTalents DB!"),
    (err) => {
      console.error("holoproTalents DB error:");
      console.error(err);
    };
});

app.set("view engine", "ejs");

app.use("/talents", talentsRouter);

app.get("/", (req, res) => {
  res.render("talents/index", { talents });
});

app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});
