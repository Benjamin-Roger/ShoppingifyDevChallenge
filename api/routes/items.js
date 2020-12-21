var express = require("express");
var router = express.Router();

const itemsControllers = require('../controllers/items');


/* GET all items  */
router.get("/", itemsControllers.getItems);

// Create a new item
router.post("/", itemsControllers.createItem);


// Get categories
router.get("/categories", itemsControllers.getCategories);

module.exports = router;
