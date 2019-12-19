const mongoose = require("mongoose")
// const config = require("config")

const dbSettings = require("./configs/default.json").databases
const DB_NAME = dbSettings.MongoDB.dbName
const DB_HOST = dbSettings.MongoDB.host
const DB_PORT = dbSettings.MongoDB.port
const logMessages = require("./configs/default.json").logMessages
const responseHeaders = require("./configs/default.json").app.responseHeaders

const CONNECTION_TO_DB_FAILED = logMessages.CONNECTION_TO_DB_FAILED
const CONNECTION_TO_DB_CREATED = logMessages.CONNECTION_TO_DB_CREATED
const CREATING_CONNECTION_TO_DB = logMessages.CONNECTION_TO_DB_CREATED

const util = {
  createDbConnection: (callback) => {
    console.log(CREATING_CONNECTION_TO_DB)
    mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true },
      (err) => {
        if (err) {
          console.error(CONNECTION_TO_DB_FAILED, err)
          throw err
        }
        console.log(CONNECTION_TO_DB_CREATED)
        callback()
      }
    )
  },

  getResponseHeaders: () => {
    return responseHeaders
  },

  sendError: (res, msg, status) => {
    response = {
      error: true,
      message: msg
    }
    res.status(status).json(response)
  }
}

exports.util = util
