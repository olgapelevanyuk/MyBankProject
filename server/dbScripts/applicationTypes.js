const mongoose = require("mongoose")
const applicationType = require("../models/applicationType").model
const util = require("../util").util
const createDbConnection = util.createDbConnection

const dbSettings = require("../configs/default.json").databases
const DB_NAME = dbSettings.MongoDB.dbName
const DB_HOST = dbSettings.MongoDB.host
const DB_PORT = dbSettings.MongoDB.port
const dbInitialData = require("../configs/dbInitialData.json")
const APPLICATION_TYPES = dbInitialData.applicationTypes
const logMessages = require("../configs/default.json").logMessages
const SUCCESSFULLY_SAVED_TO_DB = logMessages.SUCCESSFULLY_SAVED_TO_DB
const CANT_SAVE_TO_DB = logMessages.CANT_SAVE_TO_DB

async function main() {
  await createDbConnection(mongoose, DB_HOST, DB_PORT, DB_NAME)
  await applicationType.insertMany(APPLICATION_TYPES, (err, docs) => {
    if (err) console.error(CANT_SAVE_TO_DB + "\n", err)
    console.log(SUCCESSFULLY_SAVED_TO_DB + "\n", docs)
    mongoose.disconnect()
  })
}

main()
