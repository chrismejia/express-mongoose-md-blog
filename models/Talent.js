const mongoose = require("mongoose");
const slugify = require("slugify");
const { marked } = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const holoUnits = require("../data/holopro_units.json");

const dompurify = createDomPurify(new JSDOM().window);

const talentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    debutDate: { type: Date, required: true },
    unitName: { type: String, required: true },
    youtube: { type: String, required: true },
    twitter: { type: String, required: true },
    bioBlurb: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sanitizedHTML: { type: String, required: true },
  },
  { timestamps: true }
);

talentSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (this.bioBlurb) {
    const parsedMarkdown = marked.parse(this.bioBlurb);
    console.log(parsedMarkdown);
    const sanitizedMarkdown = dompurify.sanitize(parsedMarkdown);
    this.sanitizedHTML = sanitizedMarkdown;
  }

  next();
});

module.exports = mongoose.model("Talent", talentSchema);
