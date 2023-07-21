const mongoose = require('mongoose');

const { FORBIDDEN_ERROR, ID_NOT_FOUND_ERROR } = require('../utils/constants');

const { ValidationError } = mongoose.Error;
const Movie = require('../models/movie');
const { NotFound } = require('../utils/responsesErrors/NotFound');
const { BadRequest } = require('../utils/responsesErrors/BadRequest');
const { Forbidden } = require('../utils/responsesErrors/Forbidden');

const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(ID_NOT_FOUND_ERROR))
    .then((movie) => {
      if (!movie.equals(req.user._id)) {
        return next(new Forbidden(FORBIDDEN_ERROR));
      }
      return movie.deleteOne().then(() => res.send({ message: 'Фильм удален.' }));
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getSavedMovies,
  deleteMovies,
};
