const express = require("express");
const Talent = require("./../models/Talent");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("talents/new");
});

router.post("/", async (req, res) => {
  let newTalent;
  const {
    name,
    month,
    day,
    year,
    tagline,
    unitName,
    youtube,
    twitter,
    bioBlurb,
  } = req.body;

  let debutDate = new Date(Number(year), Number(month) - 1, Number(day));

  newTalent = new Talent({
    name,
    debutDate,
    tagline,
    unitName,
    youtube,
    twitter,
    bioBlurb,
  });

  try {
    console.log(newTalent);
    // newTalent = await Talent.create({
    //   name,
    //   debutDate,
    //   tagline,
    //   unitName,
    //   youtube,
    //   twitter,
    //   bioBlurb,
    // });
  } catch (error) {
    console.error("There has been has error in try to create a new Talent.");
    console.error(error);
  }
});

module.exports = router;
