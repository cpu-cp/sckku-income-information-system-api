var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordKkufmisSchema = new Schema({
    _id: { type: String },
    income_one: { type: Number },
    income_one_one: { type: Number },
    income_one_two: { type: Number },
    income_two: { type: Number },
    income_three: { type: Number },
    income_four: { type: Number },
    income_five: { type: Number },
    income_six: { type: Number },
    income_seven: { type: Number },
    income_eight: { type: Number },
    income_nine: { type: Number },
    income_ten: { type: Number },
    income_ten_one: { type: Number },
    income_ten_two: { type: Number },
    income_eleven: { type: Number },
    income_twelve: { type: Number },
    income_total: { type: Number },

    expense_a_one: { type: Number },
    expense_a_two: { type: Number },
    expense_a_three: { type: Number },
    expense_a_four: { type: Number },
    expense_a_five: { type: Number },
    expense_a_six: { type: Number },
    expense_a_seven: { type: Number },
    expense_a_eight: { type: Number },
    expense_a_nine: { type: Number },
    expense_a_ten: { type: Number },
    expense_a_total: { type: Number },
    expense_a_blue: { type: Number },

    expense_b_one: { type: Number },
    expense_b_two: { type: Number },
    expense_b_total: { type: Number },
    expense_b_blue: { type: Number },

    expense_c_one: { type: Number },
    expense_c_two: { type: Number },
    expense_c_total: { type: Number },
    expense_c_blue: { type: Number },

    expense_d_one: { type: Number },
    expense_d_two: { type: Number },
    expense_d_total: { type: Number },
    expense_d_blue: { type: Number },
},
    { versionKey: false }
);

module.exports = mongoose.model('recordKkufmis', recordKkufmisSchema);