const mongoose = require('mongoose');
require('@/db/models/Lists');

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

    // Open connection
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

    const Lists = mongoose.model('lists');

    // Get all lists from the DB
    let lists = await connector.then(async () => {
        return await Lists.find({});
    })


    if (lists) {
        res.status(200).json(lists);
    } else {
        res.status(404).json({ message: "The lists are not available" })
    }

};




