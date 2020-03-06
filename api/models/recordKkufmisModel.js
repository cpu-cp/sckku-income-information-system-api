var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var income = new Schema({
    sc: { type: String },
    value: { type: Number }
},
    { versionKey: false }
);

var recordKkufmisSchema = new Schema({
    _id: { type: String },
    incomes: [income]
},
    { versionKey: false }
);


module.exports = mongoose.model('recordKkufmis', recordKkufmisSchema);