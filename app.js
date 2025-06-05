const express = require("express");
const { getEndPointsJSON } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controllers");
const { handleServerErrors } = require("./errors");
const { getUsers } = require("./controllers/users.controllers");
const app = express();

app.use(express.json());

app.get("/api", getEndPointsJSON);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/users", getUsers);

app.use(handleServerErrors);
module.exports = app;
