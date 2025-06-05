const { fetchArticles } = require("../models/articles.models");

const getArticles = (request, response, next) => {
  console.log("hello from articles controller");
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = { getArticles };
