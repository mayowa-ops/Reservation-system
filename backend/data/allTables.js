//Processes allTables JSON file into Mongo table objects

var mongoose = require("mongoose");
const Table = require("../models/table").model;
const fs = require("fs");

let tableData = fs.readFileSync(__dirname + "/allTables.json");
tableData = JSON.parse(tableData).tables;
//// now we have an array of all the tables and we can now duplicate them for a particular time
let allTables = [];
tableData.forEach(table => {
  allTables.push(new Table(table));
});

module.exports = allTables;