const express = require("express");
const router = express.Router();

const recordIncomeCollection = require("../models/recordIncomeModels");

// report 1

router.get("/1", (req, res, next) => {

    var today = new Date();
    var dd = String(today.getDate()) /* .padStart(2, '0'); */
    var mm = String(today.getMonth() + 1) /*.padStart(2, '0'); */
    var yyyy = today.getFullYear();
    todayString = dd + '/' + mm + '/' + yyyy;

    recordIncomeCollection.aggregate([
        {
            $match: { receiptDate: todayString }
        },
        {
            $project: {
                _id: 1,
                receiptDate: 1,
                receiptNumber: 1,
                incomeCodeSc: 1,
                incomeListSc: 1,
                amountOfMoney: 1,
                departmentName: 1,
            }
        }
    ]).exec((err, result) => {
        if (err) {
            res.status(401).json({
                message: err
            })
        }
        else {
            if (result != '') {
                res.status(200).json(result)
            }
            else {
                res.status(401).json([{
                    receiptDate: "",
                    receiptNumber: "",
                    incomeCodeSc: "",
                    incomeListSc: "",
                    amountOfMoney: "",
                    departmentName: "",
                }])
            }
        }
    })

});

router.get("/1/date", (req, res, next) => {

    recordIncomeCollection.aggregate([
        {
            $match: { receiptDate: req.body.receiptDate }
        },
        {
            $project: {
                _id: 1,
                receiptDate: 1,
                receiptNumber: 1,
                incomeCodeSc: 1,
                incomeListSc: 1,
                amountOfMoney: 1,
                departmentName: 1,
            }
        }
    ]).exec((err, result) => {
        if (err) {
            res.status(401).json({
                message: err
            })
        }
        else {
            if (result != '') {
                res.status(200).json(result)
            }
            else {
                res.status(401).json([{
                    receiptDate: "",
                    receiptNumber: "",
                    incomeCodeSc: "",
                    incomeListSc: "",
                    amountOfMoney: "",
                    departmentName: "",
                }])
            }
        }
    })

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
            receiptDate: req.body.receiptDate,
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



//report 2

router.get("/2", (req, res, next) => {
    recordIncomeCollection.aggregate([
        {
            $match: {}
        },
        {
            $project: {
                _id: 1,
                receiptDate: 1,
                receiptNumber: 1,
                accountCode: 1,
                incomeCodeSc: 1,
                incomeListKku: 1,
                incomeListSc: 1,
                details: 1,
                receivingType: 1,
                amountOfMoney: 1,
                departmentName: 1,
            }
        }
    ]).exec((err, result) => {
        if (err) {
            res.status(500).json({
                message: err
            })
        }
        else {
            if (result != '') {
                res.status(200).json(result)
            }
            else {
                res.status(401).json([{
                    receiptDate: "",
                    receiptNumber: "",
                    accountCode: "",
                    incomeCodeSc: "",
                    incomeListKku: "",
                    incomeListSc: "",
                    details: "",
                    receivingType: "",
                    amountOfMoney: "",
                    departmentName: "",
                }])
            }
        }
    })

});

router.put("/2", (req, res, next) => {
    recordIncomeCollection.updateOne({ _id: req.body._id }, {
        $set: {
            receiptDate: req.body.receiptDate,
            receiptNumber: req.body.receiptNumber,
            accountCode: req.body.accountCode,
            incomeCodeSc: req.body.incomeCodeSc,
            incomeListKku: req.body.incomeListKku,
            incomeListSc: req.body.incomeListSc,
            details: req.body.details,
            receivingType: req.body.receivingType,
            amountOfMoney: req.body.amountOfMoney,
            departmentName: req.body.departmentName,
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
