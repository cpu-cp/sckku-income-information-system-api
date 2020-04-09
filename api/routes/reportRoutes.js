const express = require("express");
const router = express.Router();

const recordIncomeCollection = require("../models/recordIncomeModel");

const getBranchReportTable = require('../maps/branchReport.map');

/ report 1 /
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
                branchName: 1,
                credit: "",
                total: "",
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
                    branchName: "",
                    credit: "",
                    total: "",
                }])
            }
        }
    })

});

router.get("/1/:date/:month/:year", (req, res, next) => {

    recordIncomeCollection.aggregate([
        {
            $match: { receiptDate: `${req.params.date}/${req.params.month}/${req.params.year}` }
        },
        {
            $project: {
                _id: 1,
                receiptDate: 1,
                receiptNumber: 1,
                incomeCodeSc: 1,
                incomeListSc: 1,
                amountOfMoney: 1,
                branchName: 1,
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
                    branchName: "",
                }])
            }
        }
    })

});

router.get("/1/:date/:month/:year/:incomeCodeSc", (req, res, next) => {

    recordIncomeCollection.aggregate([
        {
            $match: { incomeCodeSc: req.params.incomeCodeSc, receiptDate: `${req.params.date}/${req.params.month}/${req.params.year}` }
        },
        {
            $project: {
                _id: 1,
                receiptDate: 1,
                receiptNumber: 1,
                incomeCodeSc: 1,
                incomeListSc: 1,
                amountOfMoney: 1,
                branchName: 1,
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
                    branchName: "",
                }])
            }
        }
    })

});

router.put("/1/", (req, res, next) => {
    recordIncomeCollection.updateOne({ _id: req.body._id }, {
        $set: {
            paymentLocation: req.body.paymentLocation,
            departmentName: req.body.departmentName,
            receiptDate: req.body.receiptDate,
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



/ report 2 /
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
                branchName: 1,
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
                    branchName: "",
                }])
            }
        }
    })

});

router.get("/2/:incomeCodeSc", (req, res, next) => {
    recordIncomeCollection.aggregate([
        {
            $match: {incomeCodeSc: req.params.incomeCodeSc}
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
                branchName: 1,
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
                    branchName: "",
                }])
            }
        }
    })

});

router.get("/2/month/:month", (req, res, next) => {
    regex = new RegExp("^\\d{1,2}\/(" + req.params.month + ")\/\\d{4}$")  // regex should be /^\d{1,2}\/(monthValue)\/\d{4}$/
    recordIncomeCollection.aggregate([
        {
            $match: {receiptDate: {'$regex' : regex, '$options' : 'i'}}
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
                branchName: 1,
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
                    branchName: "",
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
            branchName: req.body.branchName,
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


/ report 3 /
router.get("/3", async (req, res, next) => {
  /**
   * data: [
   *  {
   *      scCode: string;
   *      scName: string;
   *      depth: number; // 1 2 3
   *      values: number[] // length 14;
   *      total: number;
   *  }
   * ],
   * total: number[] // length 14;
   */

  const incomeDocs = await recordIncomeCollection.find();
  if (incomeDocs == "") {
    res.status(401).json({
      message: "emtpy"
    });
    return;
  }

  const table = getBranchReportTable(incomeDocs);

  const total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 14; i++) {
    let sum = 0;
    for (const row of table) {
      if (row.depth === 1) {
        sum += row.values[i];
      }
    }
    total[i] = sum;
  }

  res.status(200).json({
    data: table,
    total
  });
});

router.get("/3/:month/:year", async (req, res, next) => {
    regex = new RegExp("^\\d{1,2}\/(" + req.params.month + ")\/(" + req.params.year + ")$") 
    const incomeDocs = await recordIncomeCollection.find( {receiptDate: {'$regex' : regex, '$options' : 'i'}} );
    if (incomeDocs == "") {
      res.status(401).json({
        message: "emtpy"
      });
      return;
    }
  
    const table = getBranchReportTable(incomeDocs);
  
    const total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
    for (let i = 0; i < 14; i++) {
      let sum = 0;
      for (const row of table) {
        if (row.depth === 1) {
          sum += row.values[i];
        }
      }
      total[i] = sum;
    }
  
    res.status(200).json({
      data: table,
      total
    });
  });



module.exports = router;
