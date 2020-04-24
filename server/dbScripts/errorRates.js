const mongoose = require("mongoose");
const errorRate = require("../models/errorRate").model;
const applicationType = require("../models/applicationType").model;
const util = require("../util").util;
const createDbConnection = util.createDbConnection;

const dbSettings = require("../configs/default.json").databases;
const DB_NAME = dbSettings.MongoDB.dbName;
const DB_HOST = dbSettings.MongoDB.host;
const DB_PORT = dbSettings.MongoDB.port;
const dbInitialData = require("../configs/dbInitialData.json");
const ERROR_RATE_TYPES = dbInitialData.errorRates;
const logMessages = require("../configs/default.json").logMessages;
const SUCCESSFULLY_SAVED_TO_DB = logMessages.SUCCESSFULLY_SAVED_TO_DB;
const CANT_SAVE_TO_DB = logMessages.CANT_SAVE_TO_DB;

async function main() {
  await createDbConnection(mongoose, DB_HOST, DB_PORT, DB_NAME);
  ERROR_RATE_TYPES.forEach(async (errType) => {
    const errorTypeId = await applicationType
      .findOne({ name: errType.errorName })
      .then((res) => {
        return res._id;
      });
    console.log(errorTypeId);
    const errRate = new errorRate({
      rate: errType.rate,
      errorType: errorTypeId,
    });
    errRate
      .save()
      .then((response) => {
        console.log(SUCCESSFULLY_SAVED_TO_DB + "\n", response);
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error(CANT_SAVE_TO_DB + "\n", err);
        mongoose.disconnect();
      });
  });
}

main();
