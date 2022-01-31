# Markdown Blog Lesson

## Tech stack

- NodeJS
- Express
- MongoDB
- Mongoose

## Dependencies

### Regular

- ejs
- express
- mongoose

### Development

- nodemon

## 1. Initialize project

- Start npm project
- Initialize git repo
- Create repo `.gitignore`
- Create `devStart` command and `server.js`
  - `"scripts": { "devStart": "nodemon server.js"},`

## 2. Connecting Express

- Import Express
- Create Express instance
- Listen to app on port of choice
- Visit `localhost:3001` to view error on index route

```js
// server.js

const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 3. Establishing index route

Add a GET index route, `/`, where the response sends back basic text.

```js
// server.js

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 4. Rendering templates by setting the view engine

We want to render more than just basic text so we need to set a view engine to render templates that we will create. Set the view engine to `ejs`.

```js
// server.js

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 5. Rendering the index view page

Create the folder `views` and within, create `index.ejs`. In that file, typing `!` should bring up the emmet for HTML5 to give boilerplate code.

```js
// views/index.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Markdown blog</title>
  </head>
  <body>
    <h1>This is the rendered HTML index page.</h1>
  </body>
</html>
```

Update the index GET route callback to `render` index instead of just `send`ing plaintext. Remember, `express` knows to look for a `views` folder, so no `views/` path prefix needed; nor a file extension!

```js
// server.js

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 6. Establishing first route

Create a `routes` folder and within, create `articleRouter.js`. We want to create a `Router` instance for all `/articles/` routes; all of that logic will be placed here. Export this router for use in the server.

```js
// /routes/articleRouter.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("on articles index page");
});

module.exports = router;
```

In `server.js`, we can import the newly created router and tell express to `use` it for routes mounted to `/articles`. Confirm that the router is mounted properly by visiting `/articles` index.

```js
// server.js

const express = require("express");
const articleRouter = require("./routes/articleRouter"); // <- the import

const app = express();

app.set("view engine", "ejs");

app.use("/articles", articleRouter); // <- Imported router is now mounted to /articles/

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 7. Passing article data from express to ejs template

In `server.js`, we can pass an additional argument to the index render, the articles data (which has not yet been established). This second render argument is an object with an `articles` variable that serves as both key name and key-value.

```js
// server.js

app.get("/", (req, res) => {
  res.render("index", { text: "Markdown Blog Index Page" }); // <- the server variable and corresponding data
});
```

That `articles` variable and data will now be available in the `index.ejs` file for use and rendering. We can output the variable using the ejs format `<%= variableNameHere %>` in the ejs file. Afterwards, refresh the index route to view the server data in actions.

```js
// views/index.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Markdown blog</title>
  </head>
  <body>
    <h1><%= text %></h1>  <!-- ejs expression; `text` variable called -->
  </body>
</html>
```

## 8. Mocking article data

In `server.js`, create mock article data within the index route callback. The `articles` will be an array of objects, each of which will contain at least a `title`, `date`, and `description`.

Next, replace the `text` server variable with this new `articles` variable. You can use shorthand object assignment here:

```js
// server.js

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      date: Date.now(),
      description: "A short blurb describing this test article.",
    },
  ];

  res.render("index", { articles });
});
```

We can reflect this new data in `index.ejs` by replacing the variable. Note that when you save and refresh the index, what's rendered now is `[object Object]`; that's because HTML needs to _ULTIMATELY_ render the correct data type (strings or numbers) for the appropriate HTML tags, and attributes. We can iterate over arrays and select from objects to get to these basic data types.

```js
// views/index.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Markdown blog</title>
  </head>
  <body>
    <h1><%= articles %></h1> <!-- calling the articles variable; will currently render `[object Object]` -->
  </body>
</html>
```

## 9. Importing Bootstrap as our CSS framework

We will import bootstrap via a `link` tag that we'll place in the `head` tag in `index.ejs`.

```html
<!-- views/index.ejs -->
<!-- <head> tag snippet -->

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- the link tag containing the external bootstrap CSS info -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />

  <title>My Markdown blog</title>
</head>
```

### What is bootstrap?

According to Wikipedia:

> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

## 10. Assembling the basic index landing page header section

Bootstrap provides us with built-in components accessible via class names we assign in our HTML.

We will be calling upon the `container`, `margin (m)`, and `button (btn)` Bootstrap classes to begin styling our index landing header.

```js
// views/index.ejs
// <body> snippet

<body>
  <div class="container">
    <h1 class="mb-4">Blog articles</h1>
    <a href="/articles/new" class="btn btn-success">
      New Article
    </a>
  </div>
</body>
```

### Bootstrap component breakdown

#### The `container`

[Bootstrap docs - container](https://getbootstrap.com/docs/5.1/layout/containers/)

> #### Containers
>
> Containers are a fundamental building block of Bootstrap that contain, pad, and align your content within a given device or viewport.
>
> #### How they work
>
> Containers are the most basic layout element in Bootstrap and are required when using our default grid system. Containers are used to contain, pad, and (sometimes) center the content within them. While containers can be nested, most layouts do not require a nested container.

#### `margin`

[Bootstrap docs - spacing](https://getbootstrap.com/docs/5.1/utilities/spacing/)

> #### Spacing
>
> Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an element’s appearance.
>
> #### Margin and padding
>
> Assign responsive-friendly margin or padding values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties. Classes are built from a default Sass map ranging from .25rem to 3rem.

#### `button`

[Bootstrap docs - button](https://getbootstrap.com/docs/5.1/components/buttons/)

> #### Buttons
>
> Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.

## 11. Iterating through `articles` data set to render each element

We can render a collection of data in `ejs` by wrapping Javascript code in `<% someJSCodeHere %>` blocks.

**NB:** take care to close each `<% %>` , and `<%= %>` on the same line you opened it!

```js
// views/index.ejs
// <div class="container"> snippet

<div class="container">
  <h1 class="mb-4">Blog articles</h1>
  <a href="/articles/new" class="btn btn-success">New Article</a>

  // wrapping the forEach in an expression, not an output!
  // notice the closing of each tag, per line

  <% articles.forEach(article => { %>
  <div class="card mt-4"><%= article.title%></div>
  <% }) %>
</div>
```

## 12. Fleshing out the article card layout with more components

[Timestamp](https://youtu.be/1NrHkjlWVhM?t=912)

```js
// views/index.ejs
// expanded card snippet

<% articles.forEach(article => { %>
<div class="card mt-4">
  <div class="card-body">
    <div class="card-title"><%= article.title%></div>
    <div class="card-subtitle text-muted mb-2"><%= article.date %></div>
  </div>
</div>
<% }) %>
```
