const express = require("express");
const talentsRouter = require("./routes/talentsRouter");

const app = express();

app.set("view engine", "ejs");

app.use("/talents", talentsRouter);

app.get("/", (req, res) => {
  const talents = [
    {
      name: "Test Talent",
      debuted: new Date(),
      tagline: "A short blurb describing this first test talent.",
    },
    {
      name: "Test Talent 2",
      debuted: new Date(),
      tagline: "A short blurb describing this second test talent.",
    },
  ];

  res.render("talents/index", { talents });
});

app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});
