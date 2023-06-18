const express = require("express");
const bodyParser = require("body-parser");

const Tests = require("../models/test");
const testRouter = express.Router();

testRouter.use(bodyParser.json());

testRouter
  .get("/", (req, res, next) => {
    Tests.find({})
      .then(
        (tests) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(tests);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Tests.create(req.body)
      .then((test) => {
        console.log("Test created", test);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(test);
      })
      .catch((err) => next(err));
  });

module.exports = testRouter;
