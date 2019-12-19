const Application = require("../models/application").model
const ApllicationType = require("../models/applicationType").model
const User = require("../models/user").model

const applicationController = {
  patchById: async (req, res) => {
    try {
      const newapplication = new Application(req.body)
      // console.log("BODY", req.body)
      const app = await Application.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      ).exec((err, response) => {
        console.log(response, "RESPONSE")
        res.send(response)
      })
    } catch (err) {
      console.log(err)

      res.status(400).send()
    }
  },
  findById: async (req, res) => {
    try {
      const app = await Application.findOne({ _id: req.params.id }).populate([
        "type",
        "operator"
      ])
      const formatedApp = { ...app.toObject(), type: app.type.name }
      res.send(formatedApp)
    } catch (err) {
      console.log(err)

      res.status(400).send()
    }
  },
  getAllAplications: async (req, res) => {
    try {
      Application.find({}, {})
        .populate(["type", "operator"])
        .exec(function(err, applications) {
          const formatedApplications = applications
            .map((app) => app.toObject())
            .map((app) => ({
              ...app,
              type: app.type.name
            }))
          res.send(formatedApplications)
        })
    } catch (err) {
      console.log(err)

      res.status(400).send()
    }
  },
  writeApplication: async (req, res) => {
    try {
      const typeId = await ApllicationType.findOne({
        name: req.body.type
      }).then((res) => {
        return res._id
      })

      const application = new Application(req.body)
      application.type = typeId
      application
        .save()
        .then((response) => {
          console.log("SUCCESSFULLY_SAVED_TO_DB" + " " + res._id)
          res.send(response)
        })
        .catch((err) => {
          console.log("CANT_SAVE_TO_DB" + "\n" + err)
        })
    } catch (err) {
      console.log(err)
      res.status(400).send()
    }
  }
}

exports.controller = applicationController
