const express = require("express");
const articleRouter = require("./routes/articleRouter");

const app = express();

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      date: Date.now(),
      description: "A short blurb describing this test article.",
    },
  ];

  res.render("index", { articles }); // <- the shorthand assignment
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
