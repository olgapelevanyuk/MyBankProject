const router = require("express").Router()
const controller = require("../controllers/applications").controller

router.route("/").get(controller.getAllAplications)
router.route("/").post(controller.writeApplication)
router.route("/:id").get(controller.findById)
router.route("/:id").patch(controller.patchById)
// router.route("/bytitle").get(controller.findByTitle);

exports.router = router
