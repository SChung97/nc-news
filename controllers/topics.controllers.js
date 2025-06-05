const { fetchTopics } = require("../models/topics.models");

const getTopics = (request, response, next) => {
  console.log("hello from topics controller");

  return fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics };
