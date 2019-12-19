const User = require("../models/user").model
const UserType = require("../models/userType").model

const userController = {
  findById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate("type")
      const formatedUser = {
        ...user.toObject(),
        type: user.type.name,
        id: user._id
      }
      res.send(formatedUser)
    } catch (err) {
      console.log(err)
      res.status(400).send()
    }
  },
  getAll: (req, res) => {
    try {
      User.find({}, {})
        .populate("type")
        .exec(function(err, users) {
          console.log(users)
          const formatedUsers = users
            .map((user) => user.toObject())
            .map((user) => ({
              ...user,
              type: user.type.name
            }))
          console.log("FROMATED", formatedUsers)
          res.send(formatedUsers)
        })
    } catch (err) {
      console.log(err)

      res.status(400).send()
    }
  },
  writeUser: async (req, res) => {
    try {
      console.log(req.body)
      const typeId = await UserType.findOne({ name: req.body.type }).then(
        (res) => {
          return res._id
        }
      )
      console.log(typeId, "TYPE ID")
      const user = new User(req.body)
      user.type = typeId
      user
        .save()
        .then((res) => {
          console.log("SUCCESSFULLY_SAVED_TO_DB" + " " + res._id)
        })
        .catch((err) => {
          console.log("CANT_SAVE_TO_DB" + "\n" + err)
        })
      res.send("OK")
    } catch (err) {
      console.log(err)

      res.status(400).send()
    }
  }
}

exports.controller = userController
