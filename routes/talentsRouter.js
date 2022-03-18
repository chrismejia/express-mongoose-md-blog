const express = require("express");
const Talent = require("./../models/Talent");
const holoUnits = require("../data/holopro_units.json");

const router = express.Router();

router.get("/new", (req, res) => {
  res.render("talents/new", { talent: new Talent(), holoUnits });
});

router.post("/", async (req, res) => {
  const { name, month, day, year, unitName, youtube, twitter, bioBlurb } =
    req.body;

  let debutDate = new Date(Number(year), Number(month) - 1, Number(day));

  try {
    let newTalent = await Talent.create({
      name,
      debutDate,
      unitName,
      youtube,
      twitter,
      bioBlurb,
    });
    res.redirect(`/talents/${newTalent.id}`);
  } catch (error) {
    console.error(
      "There has been has an error in trying to create a new Talent."
    );
    console.error(error);
    res.render("talents/new", { talent: req.body, holoUnits });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const talent = await Talent.findOne({ slug: req.params.id });

    if (talent === null) {
      res.redirect("/");
    }

    res.render("talents/show", { talent });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  await Talent.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
