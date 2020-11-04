const mongoose = require('mongoose');

require('@/db/models/Lists');

var connectionString = process.env.MONGODB_CONNECTION_STRING;

import runCorsMiddleware from '@/utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['DELETE'],
})

module.exports = async (req, res) => {


    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

    if (req.method = "DELETE") {

        const listValuesToDelete = req.query;

        console.log("query", req.query._id);

        // Open the connection
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

        const Lists = mongoose.model('lists');

        // connector.then(async () => {

        const deletedItems = await Lists.remove({ _id: listValuesToDelete._id });

        if (deletedItems.deletedCount) {
            return res.status(200).json({
                message: `The list ${listValuesToDelete.name} has been deleted. - backend - number ${deletedItems.deletedCount}`,
                _id: listValuesToDelete._id
            })
        } else {
            return res.status(404).json({
                message: `No list in the database with the id ${listValuesToDelete._id}`
            });
        }


        // });

    }

    else return res.status(400).json({ message: "Error." });

}


