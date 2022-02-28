const express = require("express");
const Talent = require("./../models/Talent");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("talents/new", { talent: new Talent() });
});

router.post("/", async (req, res) => {
  let newTalent;
  const { name, month, day, year, unitName, youtube, twitter, bioBlurb } =
    req.body;

  let debutDate = new Date(Number(year), Number(month) - 1, Number(day));

  newTalent = new Talent({
    name,
    debutDate,
    unitName,
    youtube,
    twitter,
    bioBlurb,
  });

  try {
    newTalent = await newTalent.save();
    res.redirect(`/talents/${newTalent.id}`);
  } catch (error) {
    console.error(
      "There has been has an error in trying to create a new Talent."
    );
    console.error(error);
    res.render("talents/new", { talent: req.body });
  }
});

router.get("/:id", (req, res) => {
  res.send(`Current talent id is ${req.params.id}`);
});

module.exports = router;
