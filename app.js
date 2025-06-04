const express = require("express");
const { getEndPointsJSON } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controllers");

const app = express();

app.get("/api", getEndPointsJSON);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);

module.exports = app;
