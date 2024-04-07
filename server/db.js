const mongoose = require("mongoose");
require('dotenv').config();
const colors = require("colors");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECTED".bgGreen, mongoose.connection.host.bgGreen);
  } catch (err) {
    console.log("ERROR".bgRed, err);
    process.exit(1);
  }
};

module.exports = connect;