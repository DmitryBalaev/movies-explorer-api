const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { DUPLICATE_ERROR, ID_NOT_FOUND_ERROR } = require('../utils/constants');

const { ValidationError } = mongoose.Error;
const User = require('../models/user');
const { NotFound } = require('../utils/responsesErrors/NotFound');
const { BadRequest } = require('../utils/responsesErrors/BadRequest');
const { Duplicate } = require('../utils/responsesErrors/Duplicate');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate(DUPLICATE_ERROR));
      } else next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(ID_NOT_FOUND_ERROR))
    .then((currentUser) => res.send({ data: currentUser }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new NotFound(ID_NOT_FOUND_ERROR))
    .then((newUserData) => res.send({ data: newUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate(DUPLICATE_ERROR));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  updateUser,
  getCurrentUser,
  createUser,
};
