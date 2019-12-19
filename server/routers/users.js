const router = require("express").Router()
const controller = require("../controllers/users").controller

router.route("/").get(controller.getAll)
router.route("/").post(controller.writeUser)
router.route("/:id").get(controller.findById);
// router.route("/bytitle").get(controller.findByTitle);

exports.router = router
