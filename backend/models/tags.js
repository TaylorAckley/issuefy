var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {type: String, required: true, trim: true, lowercase: true, unique: true},
    expiration: {type: Date, required: false},
    description: {type: String, required: false},
    created_by: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    updated_by: {type: String, required: false}
});

TagSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('tags', TagSchema);
