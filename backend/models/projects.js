var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {type: String, required: true, trim: true},
    prefix: {type: String, required: true, unique: true},
    org: {type: Schema.ObjectId, required: true, default: '56677e2191015d882f8ede28'},
    fields: {type: [Schema.ObjectId], required: true, default: ['566f22220cee25d4186534e3', '568a06c4cb96e3e40313ad7a']},
    isArchived: {type: Boolean, default: false},
    created_by: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    updated_by: {type: String, required: false}
});

ProjectSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('projects', ProjectSchema);
