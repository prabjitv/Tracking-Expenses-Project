const db = require("../../models");
const router = require("express").Router();

/**
 * Category - Read All
 */
router.get("/", function(req, res) {
  db.Category.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Category - Read One
 */
router.get("/:id", function(req, res) {
  db.Category.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Category - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  console.log(req.body)
  db.Category.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Category - Update
 */
router.put("/:id", function(req, res) {
  db.Category.findOneAndUpdate({ id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Category - Delete
 */
router.delete("/:id", function(req, res) {
  db.Category.findById({ id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
