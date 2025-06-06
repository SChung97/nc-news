const express = require("express");
const { getEndPointsJSON } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles.controllers");
const {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors");

const app = express();

app.use(express.json());

app.get("/api", getEndPointsJSON);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
//app.get("/api/articles/article_id/comments");
app.get("/api/users", getUsers);

app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
