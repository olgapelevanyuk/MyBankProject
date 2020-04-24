const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationTypeSchema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

exports.model = mongoose.model("ApplicationType", applicationTypeSchema);
