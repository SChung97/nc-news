const { fetchArticles } = require("../models/articles.models");

const getArticles = (request, response) => {
  console.log("hello from articles controller");
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

module.exports = { getArticles };
