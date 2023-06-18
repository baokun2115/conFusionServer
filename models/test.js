const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
