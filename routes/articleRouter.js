const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("on articles index page");
});

module.exports = router;
