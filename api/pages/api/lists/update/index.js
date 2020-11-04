const mongoose = require('mongoose');

require('@/db/models/Lists');

var connectionString = process.env.MONGODB_CONNECTION_STRING;

import runCorsMiddleware from '@/utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['PUT'],
})

module.exports = async (req, res) => {

    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

    if (req.method = "PUT") {

        const listValuesToUpdate = req.body;

        // Open the connection
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

        const Lists = mongoose.model('lists');

        connector.then(async () => {

            await Lists.findOneAndUpdate({ _id: listValuesToUpdate._id }, listValuesToUpdate);

            console.log('The list has been update - Update controller')

            return res.status(201).json({
                message: (listValuesToUpdate.status === 'completed') ? "The list has been completed." : "The list has been updated."
            })

        });

    }

    else return res.status(400).json({ message: "Error." });

}


