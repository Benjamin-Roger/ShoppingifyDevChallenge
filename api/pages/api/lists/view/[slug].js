const mongoose = require('mongoose');

require('../../../../db/models/Lists');

var connectionString = process.env.MONGODB_CONNECTION_STRING;

module.exports = async (req, res) => {

    // Get the slug from the query
    const {
        query: { slug },
    } = req;

    // Open the connection
    const connector = mongoose.connect(connectionString, { useNewUrlParser: true });

    const Lists = mongoose.model('lists');

    // Retrieve the list with the identical slug
    let list = await connector.then(async () => {
        return await Lists.find({slug:"/"+slug});
    })

    if (list.length > 0) { return res.status(200).json(list[0]); }
    else {
        return res.status(404).json({ message: `The list with the slug: /${slug} has not been found.` })
    }
 
}


