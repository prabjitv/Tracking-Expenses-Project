// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", function (req, res) {
  res.render("home", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/dashboard", isAuthenticated, function (req, res) {
  db.Coordinate.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.User],
    raw: true
  }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      console.log(dbModel);
      res.render("dashboard", {
        user: req.user,
        coordinates: dbModel,
        balance: dbModel.reduce((acc, current) => {
          return acc + current.amount;
        }, 0),
        spent: dbModel
          .filter(coordinate => {
            var startDate = new Date();
            startDate.setHours(0, 0, 0);
            var coordinateDate = new Date(coordinate.createdAt);
            return coordinate.amount < 0 && coordinateDate > startDate;
          })
          .reduce((acc, current) => {
            return acc + current.amount;
          }, 0),
        earned: dbModel
          .filter(coordinate => {
            var startDate = new Date();
            startDate.setHours(0, 0, 0);
            var coordinateDate = new Date(coordinate.createdAt);
            return coordinate.amount > 0 && coordinateDate > startDate;
          })
          .reduce((acc, current) => {
            return acc + current.amount;
          }, 0),
        difference: dbModel
          .filter(coordinate => {
            var startDate = new Date();
            startDate.setHours(0, 0, 0);
            var coordinateDate = new Date(coordinate.createdAt);
            return coordinateDate > startDate;
          })
          .reduce((acc, current) => {
            return acc + current.amount;
          }, 0)

      });
    })
    .catch(err => res.status(422).json(err));
});

// exports.getBestSellerItems = () =>
//   SaleItem.findAll({
//     attributes: [
//       "itemId",
//       [sequelize.fn("sum", sequelize.col("amount")), "total"]
//     ],
//     group: ["SaleItem.itemId"],
//     raw: true,
//     order: sequelize.literal("total DESC")
//   });

router.get("/coordinates", isAuthenticated, function (req, res) {
  db.Coordinate.findAll({
    raw: true,
    where: {
      UserId: req.user.id
    },
    include: [db.User]
  }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("coordinates", { user: req.user, coordinates: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Generic Error Page
 */
router.get("*", function (req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
