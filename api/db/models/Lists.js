const mongoose = require('mongoose');

// Define the schema
const listSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: {
        type: String,
        required: [true, 'A list name is required']
    },
    userId: {
        type: String
    },
    items: {
        type: Array
    },
    timestamp: {
        type: Date
    },
    slug: {
        type: String
    },
    status: {
        type: String
    }
})

// If the model already has a schema, do not compile it again
let Lists
try {
    Lists = mongoose.model('lists')
} catch (error) {
    Lists = mongoose.model('lists', listSchema)
}


module.exports = {
    Lists,
  };
  