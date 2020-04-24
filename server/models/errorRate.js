const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorRateTypeSchema = new Schema({
  rate: Number,
  errorType: {
    type: Schema.Types.ObjectId,
    ref: "ApplicationType",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

exports.model = mongoose.model("ErrorRate", errorRateTypeSchema);
