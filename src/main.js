const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoDB = require("./mongo/mongo.js");
const appConfig = require("./config/app.config.js");
const routes = require("./routes/index.js");

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Connect to mongodb
mongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//   Routes
app.use("/api/v1", routes);

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Listenning on ${appConfig.port}...`);
});
