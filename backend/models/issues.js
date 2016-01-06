var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = new Schema({
    title: {type: String, required: true, trim: true},
    number: {type: Number, required: true, min: 1000},
    description: {type: String, required: true},
    fields: [new Schema({
      _id: {type: Schema.ObjectId},
      value : {type: String}
    })],
    project: {type: Schema.ObjectId, required: true},
    tags: {type: Array, required: false, default: []},
    isResolved: {type: Boolean, default: false},
    created_by: {type: String, required: true},
    updated_by: {type: String, required: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

IssueSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('issues', IssueSchema);
