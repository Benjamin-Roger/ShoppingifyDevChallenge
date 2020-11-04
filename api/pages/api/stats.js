const mongoose = require('mongoose');

require('@/db/models/Lists');

import getUniqueKeys from "@/utils/sortItems";

var connectionString = process.env.MONGODB_CONNECTION_STRING;

import runCorsMiddleware from '@/utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET'],
})


module.exports = async (req, res) => {

    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

    // Open the connection
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

    // Get the model
    const Lists = mongoose.model('lists');

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
    const [arr, uniqueNames] = getUniqueKeys(allItems, 'name');

    // Initialize the object to store the amount per name
    var amountByItem = {};

    uniqueNames.map(
        (name) => {
            amountByItem[name] = 0;
            allItems
                .filter((item) => item.name === name)
                .map((item) => amountByItem[name] += item.amount)
        }
    )


    // Get the list of unique category names
    const [arrCat, uniqueCategories] = getUniqueKeys(allItems, 'category');

    // Initialize the object to store the amount per name
    var amountByCategory = {};

    uniqueCategories.map(
        (name) => {
            amountByCategory[name] = 0;
            allItems
                .filter((item) => item.category === name)
                .map((item) => amountByCategory[name] += item.amount)
        }
    )


    if (allItems) {

        res.status(200).json({ amountByItem, amountByCategory });

    }
};





