const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("on talents index page");
});

module.exports = router;
