import AppError from '@shared/errors/AppError';

import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 0.035 * 60 * 1000,
  max: 20,
  message: new AppError('Too many requests', 429),
  standardHeaders: true,
  legacyHeaders: false,
})

export default limiter;
