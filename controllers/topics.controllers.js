const { fetchTopics } = require("../models/topics.models");

const getTopics = (request, response, next) => {

  return fetchTopics()
    .then((topics) => {
      if (!topics) {
        return Promise.reject({ status: 404, msg: "Error - topic not found" });
      }
      response.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics };
