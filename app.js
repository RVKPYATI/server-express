require("dotenv").config();

const express = require("express"),
  morgan = require("morgan"),
  helmet = require("helmet"),
  mongoose = require("mongoose"),
  mongoSanitize = require("express-mongo-sanitize"),
  fs = require("fs");

const app = express(),
  port = process.env.PORT || 3000;

app.use(morgan(process.env.LOG_LEVEL));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

fs.readdirSync("./routes/").forEach((file) => {
  let fileName = file.slice(0, -3);
  app.use("/" + fileName, require("./routes/" + fileName));
});

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("MongoDB connected...");
    app.listen(port, () => {
      console.log(`Server has been started on port: ${port}`);
    });
  } catch (e) {
    console.log("Error connected MongoDB..." + e);
    process.exit(1);
  }
}

start();
