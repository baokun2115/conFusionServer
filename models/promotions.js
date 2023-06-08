const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    imgage: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
      default: "",
    },
    price: {
      type: Currency,
      reqruire: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

var Promos = mongoose.model("Promotion", promotionSchema);
module.exports = Promos;
