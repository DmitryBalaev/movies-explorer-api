const reteLimiter = require('express-rate-limit');

const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const { MONGO_DB } = process.env;
const PORT = process.env.PORT || 3000;
const MONGO_DB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
};
const RATE_LIMITER = reteLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  SECRET,
  MONGO_DB,
  PORT,
  RATE_LIMITER,
  MONGO_DB_OPTIONS,
};
