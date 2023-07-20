const router = require('express').Router();
const NotFound = require('../utils/responsesErrors/NotFound');
const { NOT_FOUND_ERROR } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateRegistration } = require('../utils/validationDataConfig');

router.use('/users', auth, require('./userRouter'));
router.use('/movies', auth, require('./movieRouter'));

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegistration, createUser);

router.use('*', (req, res, next) => next(new NotFound(NOT_FOUND_ERROR)));

module.exports = router;
