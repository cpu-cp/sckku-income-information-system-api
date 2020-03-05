var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    id: { type: String },
    name: { type: String },
    depth: { type: Number },
    values: [Number]
},
    { versionKey: false }
);

var recordFeeSchema = new Schema({
    _id : { type: String },
    fees: [itemSchema]
},
    { versionKey: false }
);

module.exports = mongoose.model('recordFees', recordFeeSchema);
