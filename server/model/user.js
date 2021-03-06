// https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-1/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  let user = this;
  const SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  let user = this;
  bcrypt.compare(passwordAttempt, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      cb(null, isMatch, user);
    }
  });
};

UserSchema.methods.toClient = function() {
  let user = this.toObject();

  //Rename fields
  user.id = user._id;

  user._id = undefined;
  user.__v = undefined;
  user.password = undefined;

  return user;
};

module.exports = mongoose.model('User', UserSchema);
