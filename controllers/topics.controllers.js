const { fetchTopics } = require("../models/topics.models");

const getTopics = (request, response) => {
  console.log("hello from topics controller");

  fetchTopics().then((topics) => {
    console.log(topics);
    response.status(200).send({ topics });
  });
};

module.exports = { getTopics };
