const mongoose = require('mongoose');

require('@/db/models/Lists');

import runCorsMiddleware from '@/utils/corsMiddleware';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['POST'],
})

import { toKebabCase } from '@/utils/toKebabCase';

var connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.set('useFindAndModify', false);

module.exports = async (req, res) => {

    // Run the cors middleware
    await runCorsMiddleware(req, res, cors);

    if (req.method = "POST") {

        const listValues = req.body;

        // Open the connection
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

        const Lists = mongoose.model('lists');

        // Add the extra values
        if (!listValues._id) { listValues._id = new mongoose.Types.ObjectId; }
        listValues.slug = "/" + toKebabCase(listValues.name);

        const newList = new Lists(listValues);

        // Find the existing list with the same _id
        let existingList = []
        connector.then(async () => {

            existingList = await Lists.find({ _id: listValues._id });

        });

        // If no existing list, then the list is stored
        if (existingList.length > 0) {
            await Lists.findOneAndUpdate({ _id: listValues._id }, listValues);

            console.log("The list has been updated (create controller).");

            return res.status(201).json({
                message: (listValues.status === 'completed') ? "The list has been completed" : "The list has been updated."
            })
        }

        else {

            let existingSlug = await Lists.find({ slug: listValues.slug });

            // Check if the list does not exist yet
            if (existingSlug.length) {
                console.log(`The slug ${existingSlug.slug} already exists.`);

                return res.status(409).json({ message: `The list ${listValues.name} already exists.` })

            } else {

                // Save the new list
                newList.save(function (err) {
                    if (err) {
                        console.log("error: ", err);
                        return res.status(500).json({ message: "The list has not been saved properly." });
                    }

                    else {
                        console.log("The list has been saved");
                        
                        return res.status(201).json({
                            message: `The list has been saved.`,
                            _id: listValues._id.toString()
                        });
                    }
                });

            };
        }

    }

    else return res.status(400).json({ message: "Error." });

}


