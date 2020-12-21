var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

require("../db/models/Lists");

const statsController = require('../controllers/stats');

var itemsRouter = require("./items");
var listsRouter = require("./lists");
var usersRouter = require("./users");

/* GET home page. */
router.get("/stats", statsController.getStats);

router.use("/items", itemsRouter);
router.use("/lists", listsRouter);
router.use("/users", usersRouter);



module.exports = router;
