const { celebrate, Joi } = require('celebrate');

const REGEX_URL = /(http:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)|(https:\/\/(?:www.|(?!www))[A-z0-9-]+\.[^\s]+)/;

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(7).required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(7).required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    image: Joi.string().required().pattern(REGEX_URL),
    trailerLink: Joi.string().required().pattern(REGEX_URL),
    thumbnail: Joi.string().required().pattern(REGEX_URL),
    year: Joi.string().length(4).required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateRegistration,
  validateNewMovie,
  validateMovieId,
  validateUserUpdate,
};
