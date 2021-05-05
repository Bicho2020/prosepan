const express = require("express");
const config = require("./src/configurations/server");
const db = require('./src/configurations/database');
const app = require('./src/app');

db.pool.connect()

app.listen(config.PORT , config.HOST ,  () => {
  console.log(`http://${config.HOST}:${config.PORT}`);
});