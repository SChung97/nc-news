const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles.models");

const getArticles = (request, response, next) => {
  console.log("hello from articles controller");
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  console.log("hello from articles controller", article_id);
  fetchArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const patchVotesByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  console.log("hello from articles controller", request.params);
 /* if ((inc_votes = {})) {
    return next({
      status: 400,
      msg: "Bad request - votes field must not be empty",
    });
  } */
  if (typeof inc_votes !== "number") {
    return next({ status: 400, msg: "Bad request - votes must be a number" });
  }
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticles, getArticleById, patchVotesByArticleId };
