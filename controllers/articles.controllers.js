const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles.models");
const { checkTopicExists } = require("../models/topics.models");

const getArticles = (request, response, next) => {
  const { sort_by = "created_at", order = "desc", topic } = request.query;
  const acceptableQueries = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ];
  const acceptableOrder = ["asc", "desc"];
  if (!acceptableQueries.includes(sort_by)) {
    return next({ status: 400, msg: "Bad request - Invalid sort query" });
  }
  if (!acceptableOrder.includes(order.toLowerCase())) {
    return next({ status: 400, msg: "Bad request - Invalid order query" });
  }

  console.log("hello from articles controller");

  const promises = [fetchArticles(sort_by, order.toLowerCase(), topic)];
  if (topic) {
    promises.push(checkTopicExists(topic));
  }
  Promise.all(promises)
    .then((results) => {
      const articles = results[0];
      let topicExists = true;
      if (topic) {
        topicExists = results[1];
      }
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
  if (inc_votes === undefined) {
    return next({
      status: 400,
      msg: "Bad request - votes field must not be empty",
    });
  }
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
