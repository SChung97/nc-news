const { fetchArticles } = require("../models/articles.models");

const getArticles = (request, response) => {
  console.log("hello from articles controller");
  fetchArticles().then((articles) => {
    console.log({ articles });
    response.status(200).send({ articles });
  });
};

module.exports = { getArticles };
