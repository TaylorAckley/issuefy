var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schemas
//org Schema
var OrgSchema = new Schema({
    name:       {type: String, required: true, trim: true, unique: true},
    regkey:     {type: String, required: true, trim: true, unique: true},
    license:    {type: Number, default: 50},
    users:      {type: Number,  default: 0},
    created_by:  {type: Schema.ObjectId},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    updated_by: {type: Schema.ObjectId, required: false}
});

OrgSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('orgs', OrgSchema);
