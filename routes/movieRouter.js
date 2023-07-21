const movieRouter = require('express').Router();
const { createMovie, getSavedMovies, deleteMovies } = require('../controllers/movies');
const { validateNewMovie, validateMovieId } = require('../utils/validationDataConfig');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', validateNewMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovies);

module.exports = movieRouter;
