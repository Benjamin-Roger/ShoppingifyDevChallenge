const mongoose = require("mongoose");

require("../db/models/Items");

var connectionString = process.env.MONGODB_CONNECTION_STRING;

/* GET all items  */
exports.getItems = async (req, res, next) => {
  // Open the connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  // Get the model
  const Items = mongoose.model("items");

  // Search for the model in the database - all instances
  let items = await connector.then(async () => {
    return await Items.find({});
  });

  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404).json({ message: "There are no items." });
  }
};

// Create a new item
exports.createItem = async (req, res, next) => {
  // to do
};



// Get categories
exports.getCategories = async (req, res, next) => {
  // Open the connection
  const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

  // Get the model
  const Items = mongoose.model('items');

  // Search for the model in the database - all instances
  let categories = await connector.then(async () => {

      var uniqueCategories = await Items.find({}).distinct('category');

      return uniqueCategories
  })


  if (categories) {

      res.status(200).json([...categories]);
  } else {
      res.status(404).json({ message: "There are no items." })
  }
};

