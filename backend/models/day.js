const mongoose = require("mongoose");
const tableSchema = require("./table").schema;
//// this database is going to save the availability of all the tables for a given day and time
var daySchema = new mongoose.Schema({
  date: Date,
  tables: [tableSchema],
});
var Day = mongoose.model("Day", daySchema);

module.exports.model = Day;
module.exports.schema = daySchema;
