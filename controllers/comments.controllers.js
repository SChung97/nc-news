
const {
  fetchCommentsByArticle,
  insertComment,

  removeCommentById,
} = require("../models/comments.models");
const { fetchArticleById } = require("../models/articles.models");

const getCommentsByArticle = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticleById(article_id)
    .then(() => {
      return fetchCommentsByArticle(article_id);
    })
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewComment = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;
  if (!username || typeof username !== "string") {
    return next({
      status: 400,
      msg: "Bad request - username field cannot be empty",
    });
  }
  if (!body || typeof body !== "string") {
    return next({
      status: 400,
      msg: "Bad request - body field cannot be empty",
    });
  }
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentById = (request, response, next) => {
  const { comment_id } = request.params;
  removeCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticle, postNewComment, deleteCommentById };
