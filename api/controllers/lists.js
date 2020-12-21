const mongoose = require("mongoose");

const { toKebabCase } = require("../utils/toKebabCase");

require("../db/models/Lists");

var connectionString = process.env.MONGODB_CONNECTION_STRING;

/* GET all lists */
exports.getLists = async (req, res, next) => {
  // Open connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  // Get all lists from the DB
  let lists = await connector.then(async () => {
    return await Lists.find({ userId: res.locals.userId });
  });

  if (lists) {
    res.status(200).json(
      lists.map((list) => {
        const { name, slug, status, timestamp, _id } = list;

        return { name, slug, status, timestamp, _id };
      })
    );
  } else {
    res.status(404).json({ message: "The lists are not available" });
  }
};

// Create a new list
exports.createList = async (req, res, next) => {
  const listValues = req.body;

  // Open the connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  // Add the extra values
  if (!listValues._id) {
    listValues._id = new mongoose.Types.ObjectId();
  }
  listValues.slug = "/" + toKebabCase(listValues.name);

  const newList = new Lists({ ...listValues, userId: res.locals.userId });

  // create if the list does not exist
  let existingSlug = await Lists.find({ slug: listValues.slug });

  if (existingSlug.length) {
    console.log(`The slug ${existingSlug.slug} already exists.`);

    return res
      .status(409)
      .json({ message: `The list ${listValues.name} already exists.` });
  } else {
    // Save the new list
    newList.save(function (err) {
      if (err) {
        console.log("error: ", err);
        return res
          .status(400)
          .json({ message: "The list has not been saved properly." });
      } else {
        console.log("The list has been saved");

        return res.status(201).json({
          message: `The list has been saved.`,
          _id: listValues._id.toString(),
        });
      }
    });
  }
};

// Update a list
exports.updateList = async (req, res, next) => {
  const listValuesToUpdate = req.body;

  // Open the connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  connector.then(async () => {
    await Lists.findOneAndUpdate(
      { _id: listValuesToUpdate._id },
      listValuesToUpdate
    );

    console.log("The list has been updated.");
  });

  return res.status(201).json({
    message:
      listValuesToUpdate.status === "completed"
        ? "The list has been completed."
        : "The list has been updated.",
  });
};

// Delete a list
exports.deleteList = async function (req, res, next) {
  const listValuesToDelete = req.query;

  // Open the connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  // connector.then(async () => {

  const deletedItems = await Lists.remove({ _id: listValuesToDelete._id });

  if (deletedItems.deletedCount) {
    return res.status(200).json({
      message: `The list ${listValuesToDelete.name} has been deleted. - backend - number ${deletedItems.deletedCount}`,
      _id: listValuesToDelete._id,
    });
  } else {
    return res.status(404).json({
      message: `No list in the database with the id ${listValuesToDelete._id}`,
    });
  }
};

// Count the number of lists
exports.countLists = async (req, res, next) => {
  // Open connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  // Get all lists from the DB
  let listsCount = await connector.then(async () => {
    return await Lists.countDocuments({ userId: res.locals.userId });
  });

  if (listsCount) {
    res.status(200).json(listsCount);
  } else {
    res.status(404).json({ message: "The lists are not available" });
  }
};

// Get a single list
exports.viewList = async (req, res, next) => {
  // Get the slug from the query
  const {
    params: { slug },
  } = req;

  // Open the connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  const Lists = mongoose.model("lists");

  // Retrieve the list with the identical slug
  let list = await connector.then(async () => {
    return await Lists.find({ slug: "/" + slug, userId: res.locals.userId });
  });

  if (list.length > 0) {
    return res.status(200).json(list[0]);
  } else {
    return res.status(404).json({
      message: `The list with the slug: /${slug} has not been found.`,
    });
  }
};
