const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const playersRouter = require("./routes/players");
const matchesRouter = require("./routes/matches");
const prevMatchesRouter = require("./routes/prevMatches");
const imageRouter = require("./routes/images");

app.use("/exercises", exercisesRouter);
app.use("/players", playersRouter);
app.use("/users", usersRouter);
app.use("/matches", matchesRouter);
app.use("/prevMatches", prevMatchesRouter);
app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
