const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
_ = require("underscore")

const recordIncomeCollection = require("../models/recordIncomeModel");
const recordKkufmisCollection = require("../models/recordKkufmisModel");
const recordFeeCollection = require("../models/recordFeeModel")

router.get("/1/:id", async (req, res, next) => {
    const record = await recordIncomeCollection.findById(req.params.id).exec();
    if (record) {
        res.status(200).json(record);
    } else {
        res.status(401).json(null);
    }
});

router.post("/1", (req, res, next) => {
    var incomeData = new recordIncomeCollection({
        _id: new mongoose.Types.ObjectId(),
        receiptDate: req.body.receiptDate,
        paymentLocation: req.body.paymentLocation,
        departmentName: req.body.departmentName,
        receiptNumber: req.body.receiptNumber,
        branchName: req.body.branchName,
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
        .insertMany(incomeData)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(401).json({
                message: err
            });
        });
});

router.post("/2", (req, res, next) => {
    var feeItem = new recordFeeCollection(_.extend({ _id: new mongoose.Types.ObjectId() }, req.body));

    feeItem.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/2", (req, res, next) => {
    recordFeeCollection.findOne().sort({ _id: -1 }).limit(1)
        .exec()
        .then(docs => {
            if (docs != '') {
                res.status(200).json(docs)
            }
            else {
                res.status(401).json({
                    message: "empty"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/3", (req, res, next) => {
    var kkufmisData = new recordKkufmisCollection({
        _id: new mongoose.Types.ObjectId(),
        incomes: req.body
    });
    recordKkufmisCollection
        .insertMany(kkufmisData)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(401).json({
                message: err
            });
        });
});

router.put("/3", (req, res, next) => {
    recordKkufmisCollection.findOne({})
        .exec()
        .then(docs => {
            console.log(docs)
            if (docs == '' || docs == null) {
                res.status(401).json({
                    message: "empty"
                })
            }
            else {
                recordKkufmisCollection.updateOne({ _id: docs._id }, {
                    $set: {
                        income_one: req.body.income_one,
                        income_one_one: req.body.income_one_one,
                        income_one_two: req.body.income_one_two,
                        income_two: req.body.income_two,
                        income_three: req.body.income_three,
                        income_four: req.body.income_four,
                        income_five: req.body.income_five,
                        income_six: req.body.income_six,
                        income_seven: req.body.income_seven,
                        income_eight: req.body.income_eight,
                        income_nine: req.body.income_nine,
                        income_ten: req.body.income_ten,
                        income_ten_one: req.body.income_ten_one,
                        income_ten_two: req.body.income_ten_two,
                        income_eleven: req.body.income_eleven,
                        income_twelve: req.body.income_twelve,
                        income_total: req.body.income_total,

                        expense_a_one: req.body.expense_a_one,
                        expense_a_two: req.body.expense_a_two,
                        expense_a_three: req.body.expense_a_three,
                        expense_a_four: req.body.expense_a_four,
                        expense_a_five: req.body.expense_a_five,
                        expense_a_six: req.body.expense_a_six,
                        expense_a_seven: req.body.expense_a_seven,
                        expense_a_eight: req.body.expense_a_eight,
                        expense_a_nine: req.body.expense_a_nine,
                        expense_a_ten: req.body.expense_a_ten,
                        expense_a_total: req.body.expense_a_total,
                        expense_a_blue: req.body.expense_a_blue,

                        expense_b_one: req.body.expense_b_one,
                        expense_b_two: req.body.expense_b_two,
                        expense_b_total: req.body.expense_b_total,
                        expense_b_blue: req.body.expense_b_blue,

                        expense_c_one: req.body.expense_c_one,
                        expense_c_two: req.body.expense_c_two,
                        expense_c_total: req.body.expense_c_total,
                        expense_c_blue: req.body.expense_c_blue,

                        expense_d_one: req.body.expense_d_one,
                        expense_d_two: req.body.expense_d_two,
                        expense_d_total: req.body.expense_d_total,
                        expense_d_blue: req.body.expense_d_blue
                    }
                }, function (err, result) {
                    if (err) {
                        res.status(401).json({
                            message: err
                        })
                    }
                    else {
                        res.status(200).json({
                            message: 'KKUFMIS updated'
                        })
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        });
});

module.exports = router;
