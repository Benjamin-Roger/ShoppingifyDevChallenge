const mongoose = require("mongoose");

// Define the schema
const itemSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: {
    type: String,
    required: [true, "An item name is required"],
  },
  note: {
    type: String,
  },
  image: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

// If the model already has been compiled, the schema is not applied again.
let Items;
try {
  Items = mongoose.model("items");
} catch (error) {
  Items = mongoose.model("items", itemSchema);
}

module.exports = {
  Items,
};
