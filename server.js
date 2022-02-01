const express = require("express");
const talentsRouter = require("./routes/talentsRouter");

const app = express();

app.set("view engine", "ejs");

app.use("/talents", talentsRouter);

app.get("/", (req, res) => {
  const talents = [
    {
      name: "Test Talent",
      date: Date.now(),
      description: "A short blurb describing this test talent.",
    },
  ];

  res.render("index", { talents });
});

app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});
