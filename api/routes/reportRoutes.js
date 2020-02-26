const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const recordIncomeCollection = require("../models/recordIncomeModels");

router.get("/1", (req, res, next) => {
    recordIncomeCollection
        .find()
        .exec()
        .then(docs => {
            if (docs != "") {
                res.status(200).json(docs);
            } else {
                res.status(401).json({
                    message: "empty"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
});

router.get("/1/:incomeCodeSc", (req, res, next) => {
    recordIncomeCollection
        .find({ incomeCodeSc: req.params.incomeCodeSc })
        .exec()
        .then(docs => {
            if (docs != "") {
                res.status(200).json(docs);
            } else {
                res.status(401).json({
                    message: "empty"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
});

router.put("/1/", (req, res, next) => {
    recordIncomeCollection.updateOne({ _id: req.body._id }, {
        $set: {
            paymentLocation: req.body.paymentLocation,
            departmentName: req.body.departmentName,
            receiptNumber: req.body.receiptNumber,
            branchmentName: req.body.branchmentName,
            accountCode: req.body.accountCode,
            incomeListKku: req.body.incomeListKku,
            incomeCodeSc: req.body.incomeCodeSc,
            incomeListSc: req.body.incomeListSc,
            details: req.body.details,
            receivingType: req.body.receivingType,
            dateDeposit: req.body.dateDeposit,
            checkNumber: req.body.checkNumber,
            checkDate: req.body.checkDate,
            amountOfMoney: req.body.amountOfMoney
        }
    }, function (err, docs) {
        if (err) {
            res.status(401).json({
                message: err
            });
        }
        else {
            res.status(200).json({
                message: req.body._id + ' updated'
            });
        }
    });

});


module.exports = router;
