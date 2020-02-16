var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    _id: { type: String },
    username: { type: String },
    password: { type: String },
},
    { versionKey: false }
);

module.exports = mongoose.model('accounts', accountSchema);