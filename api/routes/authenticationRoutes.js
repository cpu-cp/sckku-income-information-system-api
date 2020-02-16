const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accountCollection = require("../models/accountModel");

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  accountCollection.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: "username exists"
        });
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new accountCollection({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "account created",
                  uid: result._id,
                  username: result.username,
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  accountCollection.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id
            },
            process.env.TOKEN_SECRET,
            // {
            //   expiresIn: "1h"
            // }
          );
          return res.status(200).json({
            message: "Auth successful",
            uid: user[0]._id,
            username: user[0].username,
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:uid", (req, res, next) => {
  accountCollection.remove({ _id: req.params.uid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "account deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
