var express = require("express");
var router = express.Router();
const listsControllers = require("../controllers/lists");

const auth = require("../middleware/auth");

/* GET all lists */
router.get("/", auth, listsControllers.getLists);

// Create a new list
router.post("/", auth, listsControllers.createList);

// Update a list
router.put("/", auth, listsControllers.updateList);

// Delete a list
router.delete("/", listsControllers.deleteList);

// Count the number of lists
router.get("/count", auth, listsControllers.countLists);

// Get a single list
router.get("/view/:slug", auth, listsControllers.viewList);

module.exports = router;
