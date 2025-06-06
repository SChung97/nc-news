const express = require("express");
const { getEndPointsJSON } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getCommentsByArticle,
  postNewComment,
} = require("./controllers/comments.controllers");
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
app.get("/api/articles/:article_id/comments", getCommentsByArticle);
app.post("/api/articles/:article_id/comments", postNewComment);
app.get("/api/users", getUsers);

app.use(handlePostgresErrors);
app.use((request, response) => {
  response.status(404).send({ msg: "Error - path not found" });
});
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
