const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const holoUnits = require("../data/holopro_units.json");

const talentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    debutDate: { type: Date, required: true },
    unitName: { type: String, required: true },
    youtube: { type: String, required: true },
    twitter: { type: String, required: true },
    bioBlurb: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

function getBranchName(unitName) {
  let talentBranch;

  for (const { branch, units } of holoUnits) {
    if (units.indexOf(unitName) !== -1) {
      talentBranch = branch;
      return branch;
    }
  }
  // base case
  return null;
}

talentSchema.pre("validate", function (next) {
  if (this.name) {
    // const branchBase = getBranchName(this.unitName);
    // this.slug = slugify(this.name, { lower: true, strict: true });
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Talent", talentSchema);
