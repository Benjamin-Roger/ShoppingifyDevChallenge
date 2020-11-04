const mongoose = require('mongoose');
require('@/db/models/Lists');

import runCorsMiddleware from '@/utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET'],
})

var connectionString = process.env.MONGODB_CONNECTION_STRING;

module.exports = async (req, res) => {

    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

    // Open connection
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

    const Lists = mongoose.model('lists');

    // Get all lists from the DB
    let listsCount = await connector.then(async () => {
        return await Lists.countDocuments({});
    })


    if (listsCount) {
        res.status(200).json(listsCount);
    } else {
        res.status(404).json({ message: "The lists are not available" })
    }

};




