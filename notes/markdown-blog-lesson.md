# 1. Markdown Dossier Lesson

## 1.1. Tech stack

- NodeJS
- Express
- MongoDB
- Mongoose

## 1.2. Dependencies

### 1.2.1. Regular

- ejs
- express
- mongoose

### 1.2.2. Development

- nodemon

## 1.3. Project goals

- Create a page that showcases all the talents
- Be able to add new talent entries
- Be able to edit existing talent entries
- Be able to delete existing talents

## 1.4. Planned Idol Entry Fields

### 1.4.1. Required

- Name
- Debut Date
- Unit Name
- Unit Members
- YT page link
- Twitter page link
- Talent bio blurb

### 1.4.2. Optional extras

- Birthday
- Height
- HoloBranch
- Illustrator
- FanName
- Hashtags
  - Stream
  - Fan Art
- Current Sub Count
- Current View Total

## 1.5. Initialize project

- Start npm project
- Initialize git repo
- Create repo `.gitignore`
- Create `devStart` command and `server.js`
  - `"scripts": { "devStart": "nodemon server.js"},`

## 1.6. Connecting Express

- Create base `server.js` file
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

## 1.7. Establishing index route

Add a GET index route, `/`, where the response sends back basic text.

```js
// server.js

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});
```

## 1.8. Rendering templates by setting the view engine

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
  console.log("Holo talent server listening on port 3001");
});
```

## 1.9. Rendering the index view page

Create the folder `views` and within, create `index.ejs`. In that file, if you have the `EJS` VSCode extension already installed, typing `!` should bring up the emmet for HTML5 to give boilerplate code.

```js
// views/index.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Holo Talent Server</title>
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
  console.log("Holo talent server listening on port 3001");
});
```

## 1.10. Establishing first route

Create a `routes` folder and within, create `talentsRouter.js`. We want to create a `Router` instance for all `/talents/` routes; all of that logic will be placed here. Export this router for use in the server.

```js
// /routes/talentsRouter.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("on talents index page");
});

module.exports = router;
```

In `server.js`, we can import the newly created router and tell express to `use` it for routes mounted to `/talents`. Confirm that the router is mounted properly by visiting `/talents` index.

```js
// server.js

const express = require("express");
const talentsRouter = require("./routes/talentsRouter"); // <- the import

const app = express();

app.set("view engine", "ejs");

app.use("/talents", talentsRouter); // <- Imported router is now mounted to /talents/

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3001, () => {
  console.log("Markdown server listening on port 3001");
});
```

## 1.11. Passing talent data from express to ejs template

In `server.js`, we can pass an additional argument to the index render, the talents data (which has not yet been established). This second render argument is an object with an `talents` variable that serves as both key name and key-value.

```js
// server.js

app.get("/", (req, res) => {
  res.render("index", { text: "Talents Index Page" }); // <- the server variable and corresponding data
});
```

That `text` variable and data will now be available in the `index.ejs` file for use and rendering. We can output the variable using the ejs format `<%= variableNameHere %>` in the ejs file. Afterwards, refresh the index route to view the server data in actions.

```html
// views/index.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Holo Talent Server</title>
  </head>
  <body>
    <h1><%= text %></h1>
    <!-- ejs expression; `text` variable called -->
  </body>
</html>
```

## 1.12. Mocking talent data

In `server.js`, create mock talent data within the index route callback. The `talents` data we'll be expecting to receive will be an array of objects, each of which will contain at least `name`, `debuted`, and `tagline` key-value pairs.

Next, replace the `text` server variable in the `res.render()` call with this new `talents` variable. You can use shorthand object assignment here to designate `'talents'` to be both the key name and the variable you're using to assign its value.

```js
// server.js

app.get("/", (req, res) => {
  const talents = [
    {
      name: "Test Talent",
      debuted: new Date(), // <- change from static method output to instance
      tagline: "A short blurb describing this first test talent.",
    },
    {
      name: "Test Talent 2",
      debuted: Date.now()
      tagline: "A short blurb describing this second test talent.",
    },
  ];

  res.render("index", { talents }); // shorthand for { talents: talents }
});
```

We can reflect this new data in `index.ejs` by replacing the variable. Note that when you save and refresh the index, what's rendered now is `[object Object]`. That's because HTML needs to _ULTIMATELY_ render the correct data type (strings or numbers) for the appropriate HTML tags, and attributes. We can iterate over arrays and select from objects to get to these basic data types.

```html
<!-- views/index.ejs -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Holo Talent Server</title>
  </head>
  <body>
    <h1><%= talents %></h1>
    <!-- EJS outputting the `talents` variable; will currently render `[object Object]` -->
  </body>
</html>
```

## 1.13. Importing Bootstrap as our CSS framework

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

  <title>Holo Talent Server</title>
</head>
```

### 1.13.1. What is bootstrap?

According to Wikipedia:

> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

## 1.14. Assembling the basic index landing page header section

Bootstrap provides us with built-in components accessible via class names we assign in our HTML. See the `bootstrap-project-components` file for more detailed information and links to each component's corresponding docs. Try navigating to the Bootstrap docs site and learning what the

We will be calling upon the `container`, `margin (m)`, and `button (btn)` Bootstrap classes to begin styling our index landing header.

```html
<!-- views/index.ejs -->
<!-- <body> snippet -->

<body>
  <div class="container">
    <h1 class="mb-4">Our Talents</h1>
    <a href="/talents/new" class="btn btn-success"> New Talent </a>
  </div>
</body>
```

## 1.15. Iterating through `talents` data set to render each element

We can render a collection of data in `ejs` by wrapping Javascript code in `<% someJSCodeHere %>` blocks.

**NB:** take care to close each `<% %>` , and `<%= %>` on the same line you opened it!

```html
<!-- views/index.ejs -->
<!-- <div class="container"> snippet -->

  <div class="container">
    <h1 class="mb-4">Blog talents</h1>
    <a href="/talents/new" class="btn btn-success">New Talent</a>

    <!-- Wrapping the .forEach() in an expression, not an output! -->
    <!-- Iterating over the `talents` data array using .forEach and then using the single talent object element to grab data values using its keys -->
    <!-- Notice the closing of each tag, per line -->

    <% talents.forEach(talent => { %>
    <div class="card mt-4"><%= talent.name %></div>
    <% }) %>
  </div>
</div>
```

## 1.16. Fleshing out the talent card layout with more components

The `card` component offered by Bootstrap has multiple sub-components available to use. Let's use

```html
<!-- views/index.ejs -->
<!-- expanded card snippet -->

<% talents.forEach(talent => { %>
<div class="card mt-4">
  <div class="card-body">
    <div class="card-title"><%= talent.name %></div>
    <div class="card-subtitle text-muted mb-2"><%= talent.debuted %></div>
  </div>
</div>
<% }) %>
```

Our output is a card component that features the `name`, and `date` values from our test `talents` data we created in the index `GET` route.

## 1.17. Extracting and re-sourcing our test data

Now that we've rendered out our test talent's names to the page, it's a good idea to move the test data from that `app.get('/')` call to a place more easily managed.

Create the folder `__test__`, and then create a file, `test_talents.js`. In that file, copy over the talents variable then export it for use in our server file.

```js
// __test__/test_talents.js

const talents = [
  {
    name: "Test Talent",
    debuted: Date.now(),
    tagline: "A short blurb describing this first test talent.",
  },
  {
    name: "Test Talent 2",
    debuted: Date.now(),
    tagline: "A short blurb describing this second test talent.",
  },
];

module.exports = talents;
```

Now that it's been exported, we can import it back in `server.js`.

```js
// server.js

const express = require("express");
const talentsRouter = require("./routes/talentsRouter");
const talents = require("./__test__/test_talents");

const app = express();

app.set("view engine", "ejs");

app.use("/talents", talentsRouter);

app.get("/", (req, res) => {
  res.render("talents/index", { talents });
});

app.listen(3001, () => {
  console.log("Holo talent server listening on port 3001");
});
```

## 1.18. Converting _that_ large number into a readable `Date`

You might notice that the date value is a rather large number; that's because `Date.now()` [static method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) outputs the _the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC._

We need to convert to something human-readable, we need to do two things:

1. First, we need to have a `Date` instance available to operate on, instead of the `Number` that `Date.now` outputs; for this we change our test `debuted` value to a `new Date()` instance.

```js
// __test__/test_talents.js

const talents = [
  {
    name: "Test Talent",
    debuted: new Date(), // <- change from static method output to instance
    tagline: "A short blurb describing this first test talent.",
  },
  {
    name: "Test Talent 2",
    debuted: new Date(), // <- change from static method output to instance
    tagline: "A short blurb describing this second test talent.",
  },
];

module.exports = talents;
```

2. Now that we have a `Date` object instead of a `Number`, we can convert it to something human-readable using the `Date` instance method, [`.toLocaleDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString), a function that formats and outputs the date portion of the datetime value based on the user's locale.

```js
// index.ejs
// the `talents` forEach loop

<% talents.forEach(talent => { %>
  <div class="card mt-4">
    <div class="card-body">
      <div class="card-title">
        <%= talent.name %>
      </div>
      <div class="card-subtitle text-muted mb-2">
        <%= talent.debuted.toLocaleDateString() %>
      </div>
    </div>
  </div>
<% }) %>
```

## 1.19. Adding the talent's tagline

Bootstrap has a `card-text` component we can use to render a talent's tagline. We'll also be adding a margin to the bottom using the `mb-2` class.

```html
<!-- index.ejs -->

<% talents.forEach(talent => { %>
<div class="card mt-4">
  <div class="card-body">
    <div class="card-title"><%= talent.name %></div>
    <div class="card-subtitle text-muted mb-2">
      <%= talent.debuted.toLocaleDateString() %>
    </div>
    <div class="card-text mb-2"><%= talent.tagline %></div>
    <!-- tagline added -->
  </div>
</div>
<% }) %>
```

## 1.20. Creating the `/new` Talents route

It's time to add some functionality to the `New Talent` button.

We will program the route, `/talents/new`, and also create the ejs template for the route.

Remember that `talentsRouter` is mounted on `/talents`, so the route path string is simply `/new`. We then a standard `req/res` callback to `.render()` the desired template; we'll create it in a sec.

```js
// routes/talentsRouter.js

const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("talents/new");
});

module.exports = router;
```

## 1.21. Refactoring to reflect the talents index

Now, in the `views` folder, we want to create a `talents` sub-directory, and then create `new.ejs` within. But before we build that template, we should move `index.ejs` into the `views/talents` folder as it's the page that lists all the talents available.

Change the base `app.get` index route to render `talents/new` instead.

```js
// server.js

app.get("/", (req, res) => {
  res.render("talents/index", { talents }); // <- changed render target
});
```

## 1.22. Building the `/talents/new` template base

Copy the index template over and remove all code nested **within** the `container` div, except the `<h1>` tag (change its text to `Add a new talent`). Edit the page title as well.

Once complete, visit `/talents/new` to see the base template render.

```js
// views/talents/new.ejs

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />

    <title>Add a new talent</title>
  </head>
  <body>
    <div class="container">
      <h1>Add a new talent</h1>
    </div>
  </body>
</html>
```

## 1.23. Adding the talent info submission form wrapper

Under the `<h1>` tag, add a `<form>` tag with `action` and `method` attributes.

- The `action` attribute details which route the method acts on.
- The `method` attribute details the HTTP method to use. We use `POST` because we are creating something; posting a new Idol document to our database.

```html
<!-- views/talents/new -->

<body>
  <div class="container">
    <h1>Add a new talent</h1>

    <form action="/talents" method="POST">
      <!-- form fields to be nested within -->
    </form>
  </div>
</body>
```

## 1.24. Routing `/talents/new`

As built in `/views/talents/new`, we're `POST`ing to `/talents`; we can leave the `req/res` callback empty for now.

```js
// routes/talentsRouter.js

const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("talents/new");
});

router.post("/", (req, res) => {}); // cover POST to `talents` index

module.exports = router;
```

## 1.25. Partial views: reusable components

### 1.25.1. What is a partial view?

Partials are components that allow you to reuse the same HTML across multiple views. Think of partials as functions, they make large websites easier to maintain as you don’t have to go and change a piece of text in every page it appears in. Instead, you define that reusable bundle of code in a file andinclude it wherever you need it.

### 1.25.2. DRY and Partials

We can use this fact to reduce the amount of code we need to handle by creating a reusable component, aka a partial (view).

### 1.25.3. Partials Syntax

**File Names:** Best practice is to denote a partial with a starting `_` in its file name; in this case, we'll name this partial, `_form_fields.ejs`.

**EJS Syntax:** The way you tell EJS to render out the HTML of a partial view is like so:

```js
<%- include("./relative/filePath/here") %>
```

## 1.26. Determining the input types for each required field

Going back to project goals, we see that there are a lot of fields that _each_ talent will have to fill out to build their profile in our app.

> #### Required
>
> - Name
> - Debut Date
> - Unit Name
> - Unit Members
> - YT page link
> - Twitter page link
> - Talent bio blurb
>
> _Optional fields omitted for now; can be added later on as bonus features._

That means that every talent will have these seven core fields.

### 1.26.1. Name

- expecting a regular string
- single `<input>` field of type `'text'`

### 1.26.2. Date

- we can form dates using `new Date(YYYY, MM - 1, DD)` as shown in the test talent data
- a input group made of 3 `<input>` fields of type `'number'`
  - we can add attributes for `min` and `max` number values (stringified), per month, day, year limitations

OR

- we can use a single `<input>` of type `'date'`

### 1.26.3. Unit Name

- choosing a predefined option would be best
- single `<select>` element listing all current holopro units

### 1.26.4. Unit members

- not something we should designate directly
- should become associated with other existing talents in their automatically at document creation time
- therefore not an inputtable field

### 1.26.5. YT Page Link

- expecting a regular string
- single `<input>` field of type `'text'`

OR

- single `<input>` field of type `'URL'` to verify url pattern

### 1.26.6. Twitter Page Link

- expecting a regular string
- single `<input>` field of type `'text'`

OR

- single `<input>` field of type `'URL'` to verify url pattern

## 1.27. Building the `_form_fields.ejs` partial view

It's best practice to denote partials with a preceding `_` in their name.

This file will contain different _unwrapped_ HTML elements that make up the fields of our form.

Each `group` will contain a `label` and a corresponding `input` element, with certain groups handling additional fields.

### 1.27.1. Talent Name

A `form-group` wrapping a `label` for a required `input` of type `text`.

```html
<div class="form-group">
  <label for="name" class="form-label">Talent Name</label>
  <input required type="text" name="name" id="name" class="form-control" />
</div>
```

### 1.27.2. Debut Date

A `form-group` wrapping three sets of `label` for a required `input` of type `number`.

```html
<div class="form-group">
  <label for="debut-month" class="form-label">Debut Month</label>
  <input
    required
    type="number"
    name="month"
    id="debut-month"
    class="form-control"
  />

  <label for="debut-day" class="form-label">Debut Day</label>
  <input
    required
    type="number"
    name="day"
    id="debut-day"
    class="form-control"
  />

  <label for="debut-year" class="form-label">Debut Year</label>
  <input
    required
    type="number"
    name="year"
    id="debut-year"
    class="form-control"
  />
</div>
```

### 1.27.3. Unit Name

A `form-group` wrapping a `label` for a required `select` dropdown menu that itself contains the different Holopro unit names as `option` to select from.

```html
<div class="form-group">
  <label for="unit-name" class="form-label">Talent's Unit</label>
  <select name="unit-name" id="unit-name" class="form-select">
    <option value="5th Gen - NePoLaBo">5th Gen - NePoLaBo</option>
  </select>
</div>
```

### 1.27.4. YouTube Page

A `form-group` wrapping a `label` for a required `input` of type `text`.

```html
<div class="form-group">
  <label for="yt-link" class="form-label">YouTube Page</label>
  <input
    required
    type="text"
    name="yt-link"
    id="yt-link"
    class="form-control"
  />
</div>
```

### 1.27.5. Twitter Page

A `form-group` wrapping a `label` for a required `input` of type `text`.

```html
<div class="form-group">
  <label for="twitter-link" class="form-label">Twitter Page</label>
  <input
    required
    type="text"
    name="twitter-link"
    id="twitter-link"
    class="form-control"
  />
</div>
```

### 1.27.6. Talent Bio Blurb

A `form-group` wrapping a `label` for a required `textarea`.

```html
<div class="form-group">
  <label for="markdown" class="form-label">Talent Bio Blurb</label>
  <textarea name="markdown" id="markdown" class="form-control"></textarea>
</div>
```

### 1.27.7. Form submission buttons

A `form-group` wrapping a `button` to `submit` all the form field data and a `link` to return back to the `index` page.

```html
<div class="form-group">
  <button type="submit" class="btn btn-primary">Save</button>
  <a href="/" class="btn btn-secondary">Cancel</a>
</div>
```

### 1.27.8. All put together

```html
<!-- views/talents/_form_fields.ejs -->

<div class="form-group">
  <label for="name" class="form-label">Talent Name</label>
  <input required type="text" name="name" id="name" class="form-control" />
</div>

<div class="form-group">
  <label for="debut-month" class="form-label">Debut Month</label>
  <input
    required
    type="number"
    min="1"
    max="12"
    name="month"
    id="month"
    class="form-control"
  />

  <label for="debut-day" class="form-label">Debut Day</label>
  <input
    required
    type="number"
    min="1"
    max="31"
    name="day"
    id="day"
    class="form-control"
  />

  <label for="debut-year" class="form-label">Debut Year</label>
  <input
    required
    type="number"
    min="2017"
    max="2022"
    name="year"
    id="year"
    class="form-control"
  />
</div>

<div class="form-group">
  <label for="unit-name" class="form-label">Talent's Unit</label>
  <select name="unit-name" id="unit-name" class="form-select">
    <option value="5th Gen - NePoLaBo">5th Gen - NePoLaBo</option>
  </select>
</div>

<div class="form-group">
  <label for="yt-link" class="form-label">YouTube Page</label>
  <input
    required
    type="text"
    name="yt-link"
    id="yt-link"
    class="form-control"
  />
</div>

<div class="form-group">
  <label for="twitter-link" class="form-label">Twitter Page</label>
  <input
    required
    type="text"
    name="twitter-link"
    id="twitter-link"
    class="form-control"
  />
</div>

<div class="form-group">
  <label for="markdown" class="form-label">Talent Bio Blurb</label>
  <textarea
    placeholder="You can use markdown here to style this talent's bio blurb!"
    name="markdown"
    id="markdown"
    class="form-control"
    rows="5"
  ></textarea>
</div>

<div class="form-group">
  <button type="submit" class="btn btn-primary">Save</button>
  <a href="/" class="btn btn-secondary">Cancel</a>
</div>
```

## 1.28. Using the `_form_fields` partial

We can now use our `_form_fields` partial inside the `<form>` tag in `talents/new`:

```html
<!-- talents/new.ejs -->

<form action="/talents" method="POST">
  <%- include("_formFields") %>
  <!-- Notice how there's no root `./` in the path, nor .ejs extension -->
</form>
```

Visiting `/talents/new` should render the `new` page's `<form>` using the `_form_fields` partial view.

## 1.29. Establishing our app's connection to MongoDB via `mongoose`

Since this is a MongoDB interaction, we'll need to import `mongoose` for use. We can set up a `connection` by creating a DB, `holoproTalents`, and passing a callback that will let us know when we are connected to the DB, and when the DB has encountered an error.

```js
// server.js

const express = require("express");
const mongoose = require("mongoose"); // top level library import

const talentsRouter = require("./routes/talentsRouter");
const talents = require("./__test__/test_talents");

const app = express();

/**
 * The connection to the db with subsequent connection notification and error handling. We add the extra DB error line to help us differentiate a DB from any other should multiple things go wrong at once.
 */
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
```

## 1.30. Defining the `Talent` model

Make a top-level directory, `models/`, and create the `Talent.js` model file. To define a model, import `mongoose`, and then define a schema with field names based off the required inputs we've covered so far.

### 1.30.1. Our form fields (the required ones)

- Name: `String`, required
- Debut Date: `Date`, required
- Unit Name: `String`, required
  - enum (one of the following): [`"<whichever gen corresponds to selected Talent>"`]
- Unit Members: Array of `mongoose.SchemaTypes.ObjectId`, referring to the Talent model
- YT page link: `String`, required
- Twitter page link: `String`, required
- Talent bio blurb: `String`, required

### 1.30.2. Adding `createdAt` & `updatedAt` document timestamps

Instead of manually designating and managing these fields, we can pass in an additional `{ timestamps: true }` object as the second argument, after the schema object definitions:

---

Finally, compile `talentSchema` into a model, name it `Talent`, and export it for use throughout this project.

```js
const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    debutDate: { type: Date, required: true },
    unitName: { type: String, required: true, enum: ["5th Gen - NePoLaBo"] },
    unitMembers: { type: [mongoose.SchemaTypes.ObjectId], ref: "Talent" },
    youtube: { type: String, required: true },
    twitter: { type: String, required: true },
    bioBlurb: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Talent", talentSchema);
```

## 1.31. `POST`ing to `/`, processing a `Talent` document submission

To recap, we have a `<form>` wrapper on `new.ejs` with an `action` pointed to the `talents` index, a Save submit `<button>` in the `_form_fields` partial, and a placeholder `POST` route in `talentsRouter`:

```html
<!-- new.ejs -->

<form action="/talents" method="POST"><%- include("_form_fields") %></form>
```

```html
<!-- _form_fields.ejs -->

<button type="submit" class="btn btn-primary">Save</button>
```

```js
// routes/talentsRouter.js
// remember that `/` here is `/talents`

router.post("/", (req, res) => {});
```

- importing the Talent model
- telling express to use `urlencoded` back in `server.js`
- creating the `new Talent`

## Handling the success/failure of the new `Talent` entry

- handling the async `save` function using await & try/catch
- PASS: redirect to newly created Talent's page, using grabbed id
- create `param` based `:id` route in `talentsRouter`
  - no res/req actions yet
- FAIL: re-render submission page, passing down `newTalent` variable as local to express for the EJS to use.
  - modify `_form_fields` to use `talent` submission fields as default values, keeping the form populated on failed creation

## Telling `/talents/new` to use a new, blank Talent as default values on page load

## Setting up a placeholder for param route `/talents/:id` on PASS `Talent` submission
