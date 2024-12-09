const dotEnv = require("dotenv");
dotEnv.config();

const config = {
  server: {
    port: process.env.NODE_PORT || 3000,
    host: process.env.NODE_HOST || "127.0.0.1"
  },
  expressRateLimit: {
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 1 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    userName: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY
};

module.exports = config;
