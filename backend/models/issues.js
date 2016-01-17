var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projects.js');

var IssueSchema = new Schema({
    title: {type: String, required: true, trim: true,  index: true},
    number: {},
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
})
.pre('save', function(next) {
  Project.findOne({_id: this.project}).select('numberSeq').exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    console.log(doc.numberSeq);
      this.number = doc.numberSeq;
      next();
    });
});


module.exports = mongoose.model('issues', IssueSchema);
