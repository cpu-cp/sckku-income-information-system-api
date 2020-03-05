var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordIncomeSchema = new Schema({
    _id: { type: String },
    receiptDate: { type: String },
    paymentLocation: { type: String },
    departmentName: { type: String },
    receiptNumber: { type: String },
    branchName: { type: String },
    accountCode: { type: String },
    incomeListKku: { type: String },
    incomeCodeSc: { type: String },
    incomeListSc: { type: String },
    details: { type: String },
    receivingType: { type: String },
    dateDeposit: { type: String },
    checkNumber: { type: String },
    checkDate: { type: String },
    amountOfMoney: { type: Number },
},
    { versionKey: false }
);

module.exports = mongoose.model('recordIncomes', recordIncomeSchema);
