var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = new Schema({
    title: {type: String, required: true, trim: true},
    prefix: {type: String, required: true},
    project: {type: String, required: true},
    createdby: {type: String, required: true},
    updatedby: {type: String, required: true},
    isResolved: {type: Boolean, default: true},
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

module.exports = mongoose.model('issues', OrgSchema);
