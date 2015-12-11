var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {type: String, required: true, trim: true},
    prefix: {type: String, required: true},
    org: {type: String, required: true},
    fields: {type: Array, required: true, default: []},
    isArchived: {type: Boolean, default: true},
    createdby: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

ProjectSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('projects', OrgSchema);
