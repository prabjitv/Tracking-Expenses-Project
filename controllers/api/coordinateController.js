const db = require("../../models");
const router = require("express").Router();

/**
 * Coordinate - Read All
 */
router.get("/", function(req, res) {
  db.Coordinate.findAll(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Coordinate - Read One
 */
router.get("/:id", function(req, res) {
  db.Coordinate.findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Coordinate - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function(req, res) {
  db.Coordinate.create({
    UserId: req.user.id,
    ...req.body
  })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Coordinate - Update
 */
router.put("/:id", function(req, res) {
  db.Coordinate.findOneAndUpdate({ id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

/**
 * Coordinate - Delete
 */
router.delete("/:id", function(req, res) {
  db.Coordinate.findById({ id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
