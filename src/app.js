const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

const config = require("./config");
const startDatabase = require("./server/db");
const expressMiddleware = require("./middlewares/express.middleware");
const expressRateLimitMiddleware = require("./middlewares/rateLimit.middleware");
const routes = require("./routes/api.route");

const app = express();
const port = config.server.port;
const host = config.server.host;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use(expressMiddleware);
// app.use(expressRateLimitMiddleware);

startDatabase();
app.use(
  logger("dev", {
    skip: function (req, res) {
      return req.originalUrl.includes("/static/");
    }
  })
);

app.use("/api", routes);

app.listen(port, host, () => {
  console.log(`Server running a http://${host}:${port} `);
});

module.exports = app;
