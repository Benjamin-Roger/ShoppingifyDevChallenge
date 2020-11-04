const mongoose = require('mongoose');
require('@/db/models/Items');

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
    const Items = mongoose.model('items');

    // Search for the model in the database - all instances
    let items = await connector.then(async () => {
        return await Items.find({});
    })


    if (items) {
        res.status(200).json(items);
    } else {
        res.status(404).json({ message: "There are no items." })
    }

};



