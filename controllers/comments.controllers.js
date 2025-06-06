const { fetchCommentsByArticle } = require("../models/comments.models");

const getCommentsByArticle = (request, response, next) => {
  const { article_id } = request.params;
  console.log(request);
  console.log("hello from comments controller");
  return fetchCommentsByArticle(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = { getCommentsByArticle };
