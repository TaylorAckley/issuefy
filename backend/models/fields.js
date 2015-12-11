var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FieldSchema = new Schema({
    name: {type: String, required: true, trim: true},
    type: {type: String, required: true, default: 'enum'},
    choices: {type: Array, required: true},
    createdby: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

FieldSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('fields', OrgSchema);
