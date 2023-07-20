const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../utils/responsesErrors/Unauthorized');
const { LOGIN_ERROR, EMAIL_VALIDATION_ERROR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: EMAIL_VALIDATION_ERROR,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function checkPassword(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauthorized(LOGIN_ERROR));
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(new Unauthorized(LOGIN_ERROR));
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
