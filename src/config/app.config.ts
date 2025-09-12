export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  COOKIE_PARSER_SECRET: process.env.COOKIE_PARSER_SECRET
};

Object.freeze(config);
