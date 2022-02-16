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