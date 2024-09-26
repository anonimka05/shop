const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoDB = require("./mongo/mongo.js");
const appConfig = require("./config/app.config.js");
const routes = require("./routes/index.js");
const UploadImages = require("./uploads/multer.upload.js"); 

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

// Connect to mongodb
mongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//   Routes
app.use("/api/v1", routes);

app.post("/api/v1/upload/single", (req, res) => {
  UploadImages.uploadSingle()(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ message: "Iltimos, rasm yuklang" });
    }
    res.send("Bitta fayl muvaffaqiyatli yuklandi");
  });
});

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Listenning on ${appConfig.port}...`);
});
