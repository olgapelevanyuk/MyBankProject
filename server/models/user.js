const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  surname: String,
  eMail: String,
  phone: String,
  password: String,
  login: String,
  id: Number,
  type: {
    type: Schema.Types.ObjectId,
    ref: "UserType"
  }
})

exports.model = mongoose.model("User", userSchema)
