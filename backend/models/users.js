var mongoose        = require('mongoose');
var async           = require('async');
var bcrypt          = require('bcryptjs');
var Schema          = mongoose.Schema;

// user schema
var UserSchema = new Schema({
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password: { type: String, required: true},
    name: {type: String, required: true, trim: true} ,
    org: {type: String, required: true, default: '56677e2191015d882f8ede28'},
    permissions: {
      isAdmin: {type: Boolean, default: false},
      createIssue: {type: Boolean, default: true},
      commentIssue: {type: Boolean, default: true},
      deleteIssue: {type: Boolean, default: true},
      deleteField: {type: Boolean, default: false},
      createField: {type: Boolean, default: false},
      createProject: {type: Boolean, default: false},
      archiveProject: {type: Boolean, default: false},
      deleteUser: {type: Boolean, default: false},
      createUser: {type: Boolean, default: false}
    },
    token: String,
    passwordReset: {type: String, required: false},
    isActive: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('users', UserSchema);
