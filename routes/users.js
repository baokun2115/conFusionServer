var express = require("express");
var router = express.Router();

var passport = require("passport");
var authenticate = require("../authenticate");
const cors = require("./cors");

const bodyParser = require("body-parser");
var User = require("../models/users");

router.use(bodyParser.json());

/* GET users listing. */
router
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get("/", cors.cors, authenticate.verifyAdmin, (req, res, next) => {
    User.find({})
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        },
        (err) => next(err)
      )
      .catch((e) => next(e));
  });

router
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post("/signup", cors.corsWithOptions, (req, res, next) => {
    User.register(
      new User({ username: req.body.username, admin: req.body.admin }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          if (req.body.firstname) user.firstname = req.body.firstname;
          if (req.body.lastname) user.lastname = req.body.lastname;
          user.save().then((err, user) => {
            if (err) {
              res.statusCode = 500;
            }
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "Registration Successful!" });
            });
          });
        }
      }
    );
  });

router.get(
  "/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);
router
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    "/login",
    passport.authenticate("local"),
    cors.corsWithOptions,
    (req, res, next) => {
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        isAdmin: req.user.admin,
        status: "You are successfully logged in!",
      });
    }
  );

router
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get("/logout", cors.corsWithOptions, (req, res, next) => {
    if (req.session) {
      req.session.destroy(); // delete session file on server side
      res.clearCookie("session-id"); // delete cookie on client side
      res.redirect("/");
    } else {
      var err = new Error("You are not logged in!");
      err.status = 403;
      next(err);
    }
  });

module.exports = router;
