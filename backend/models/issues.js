var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = new Schema({
    title: {type: String, required: true, trim: true,  index: true},
    number: {type: Number, required: true, min: 1000},
    description: {type: String, required: true},
    vote_up: {type: Number, default: 0},
    vote_down: {type: Number, default: 0},
    comments: [new Schema({
      _id: {type: Schema.ObjectId, ref: 'users'},
      description : {type: String},
      likes: {type: Number},
      date: {type: Date}
    })],
    attachments: [new Schema({
      _id: {type: Schema.ObjectId, ref: 'fields'},
      value : {type: String}
    })],
    fields: [new Schema({
      _id: {type: Schema.ObjectId, ref: 'fields'},
      value : {type: String}
    })],
    project: {type: Schema.ObjectId, required: true, index: true, ref: 'projects'},
    tags: {type: [Schema.ObjectId], required: false, default: []},
    isResolved: {type: Boolean, default: false},
    created_by: {type: Schema.ObjectId, required: true, ref: 'users'},
    updated_by: {type: Schema.ObjectId, required: false, ref: 'users'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

IssueSchema.pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

IssueSchema.pre('save', function(next) {
    var doc = this;
    counter.findByAndUpdate({project: this.project}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error) {
            return next(error);
          }
        doc.number = counter.seq;
        next();
    });
});

var CounterSchema = Schema({
    project: {type: Schema.ObjectId, required: true},
    seq: { type: Number, default: 1000 }
});

module.exports = mongoose.model('issues', IssueSchema);
var counter = mongoose.model('counter', CounterSchema);
