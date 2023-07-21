require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  MONGO_DB,
  PORT,
  RATE_LIMITER,
  MONGO_DB_OPTIONS,
} = require('./utils/config');
const { responseHandler } = require('./middlewares/responceHandler');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, MONGO_DB_OPTIONS);

app.use(RATE_LIMITER);
app.use(helmet());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => console.log(`Приложение запущенно на: ${PORT} порту`));
