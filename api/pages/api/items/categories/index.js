import getUniqueKeys from "../../../../utils/sortItems";

const mongoose = require('mongoose');

require('../../../../db/models/Items');

import runCorsMiddleware from '../../../../utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET'],
})

var connectionString = process.env.MONGODB_CONNECTION_STRING;


module.exports = async (req, res) => {

    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

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





