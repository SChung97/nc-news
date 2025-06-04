const { fetchTopics } = require("../models/topics.models");

const getTopics = (request, response) => {
  console.log("hello from topics controller");

  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

module.exports = { getTopics };
