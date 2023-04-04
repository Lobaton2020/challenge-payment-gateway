import Joi = require('joi');
export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development')
    .default('development'),
  HTTP_PORT: Joi.number().required(),

  JWT_SECRET_KEY: Joi.string().required(),
  JWT_SECRET_KEY_REFRESH: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  JWT_EXPIRATION_TIME_REFRESH: Joi.string().required(),

  URL_API: Joi.string().required(),
  PUBLIC_KEY: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
  EVENT_KEY: Joi.string().required(),
  INTEGRITY__KEY: Joi.string().required(),

  DATABASE_TYPE: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
});
