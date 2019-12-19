const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userTypeSchema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

exports.model = mongoose.model("UserType", userTypeSchema)
