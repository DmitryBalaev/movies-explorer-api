const userRouter = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../utils/validationDataConfig');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = userRouter;
