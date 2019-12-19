const express = require("express")
const bodyParser = require("body-parser")
var path = require("path")
const applicationsRouter = require("./routers/applications").router
const usersRouter = require("./routers/users").router
const util = require("./util").util

const APP_PORT = require("./configs/default.json").app.port
const SUCCESSFULLY_STARTED = require("./configs/default.json").logMessages
  .SUCCESSFULLY_STARTED

const app = express()

const htmlPath = path.resolve(__dirname, "../public")
console.log(htmlPath)

const responseHeaders = util.getResponseHeaders()

app.use(function(req, res, next) {
  responseHeaders.forEach((header) => {
    res.header(header.name, header.value)
  })
  next()
})

app.use(express.static(htmlPath))
app.use(bodyParser.json())
app.use("/applications", applicationsRouter)
app.use("/users", usersRouter)

util.createDbConnection(() => {
  app.listen(APP_PORT, function() {
    console.log(SUCCESSFULLY_STARTED + " " + APP_PORT)
  })
})
