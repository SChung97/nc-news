const {
  fetchArticles,
  fetchArticleById,
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



module.exports = { getArticles, getArticleById };
