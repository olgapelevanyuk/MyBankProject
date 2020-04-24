const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  countNum: Number,
  clientSurname: String,
  clientFirstName: String,
  clientPatronymic: String,
  clientEMail: String,
  clientPhone: String,
  clientComment: String,
  // topic: String,
  status: Number,
  date: String,
  time: String,
  id: Number,
  type: {
    type: Schema.Types.ObjectId,
    ref: "ApplicationType",
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

exports.model = mongoose.model("Application", userSchema);
