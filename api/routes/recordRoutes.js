const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const recordIncomeCollection = require("../models/recordIncomeModels");

router.post("/1", (req, res, next) => {
    var dayMenu = new recordIncomeCollection({
        _id: new mongoose.Types.ObjectId(),
        receiptDate: req.body.receiptDate,
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
        amountOfMoney: req.body.amountOfMoney,
    });
    recordIncomeCollection
        .insertMany(dayMenu)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(401).json({
                message: err
            });
        });
});

module.exports = router;
