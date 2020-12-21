const mongoose = require("mongoose");

const { getUniqueKeys } = require("../utils/sortItems");

require("../db/models/Lists");

var connectionString = process.env.MONGODB_CONNECTION_STRING;

exports.getStats = async (req, res, next) => {
  try {
    // Open the connection
    const connector = mongoose.connect(connectionString, {
      useNewUrlParser: true,
    });

    // Get the model
    const Lists = mongoose.model("lists");

    // Get a single array with all items
    let allItems = await connector.then(async () => {
      var allLists = await Lists.find({});
      var allItemsArr = [];
      allLists.map((item) => {
        allItemsArr = allItemsArr.concat(item.items);
      });

      return allItemsArr;
    });

    // Get the list of unique item names
    const [arr, uniqueNames] = await getUniqueKeys(allItems, "name");

    // Initialize the object to store the amount per name
    var amountByItem = {};

    uniqueNames.map((name) => {
      amountByItem[name] = 0;
      allItems
        .filter((item) => item.name === name)
        .map((item) => (amountByItem[name] += item.amount));
    });

    // Get the list of unique category names
    const [arrCat, uniqueCategories] = getUniqueKeys(allItems, "category");

    // Initialize the object to store the amount per name
    var amountByCategory = {};

    uniqueCategories.map((name) => {
      amountByCategory[name] = 0;
      allItems
        .filter((item) => item.category === name)
        .map((item) => (amountByCategory[name] += item.amount));
    });

    if (allItems) {
      res.status(200).json({ amountByItem, amountByCategory });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
