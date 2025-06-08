const {
  fetchCommentsByArticle,
  insertComment,
} = require("../models/comments.models");

const getCommentsByArticle = (request, response, next) => {
  const { article_id } = request.params;
  console.log("hello from comments controller", article_id);
  return fetchCommentsByArticle(article_id)
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
  console.log("hello from comments controller");
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticle, postNewComment };
