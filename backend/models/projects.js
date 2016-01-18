var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    prefix: {type: String, required: true, unique: true, index: true},
    numberSeq: {type: Number, required: true, default: 1000, min: 1000},
    org: {type: Schema.ObjectId, required: true, default: '56677e2191015d882f8ede28'},
    fields: [{type: [Schema.ObjectId], required: true,  ref: 'fields', default: ['568a06c4cb96e3e40313ad7a', '568ad92f523c2fe01cc0359b']}],
    isArchived: {type: Boolean, default: false},
    created_by: {type: Schema.ObjectId, required: true, ref: 'users'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}   ,
    updated_by: {type: Schema.ObjectId, required: false,  ref: 'users'}
});

ProjectSchema.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

ProjectSchema.statics.getNextNumber = function(project, callback) {
  this.find({_id: project}).select('numberSeq').exec(function(err, doc) {
    var nextNum = doc.numberSeq;
    console.log(doc.numberSeq);
    callback(nextNum);
  });

  ProjectSchema.statics.incrementSeq = function(project) {
    this.update({_id: project}, {$inc:  {numberSeq: 1}});
    };

};

module.exports = mongoose.model('projects', ProjectSchema);
