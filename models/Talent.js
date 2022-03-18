const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const holoUnits = require("../data/holopro_units.json");
const { get } = require("express/lib/response");

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

talentSchema.pre("validate", () => {
  if (this.unitName) {
    const branchBase = getBranchName(this.unitName);
    this.slug = slugify(asf, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("Talent", talentSchema);
