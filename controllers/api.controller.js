const endpointsJson = require("../endpoints.json");

const getEndPointsJSON = (request, response) => {
  response
    .status(200)
    .send({ endpoints: endpointsJson })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};

module.exports = { getEndPointsJSON };
