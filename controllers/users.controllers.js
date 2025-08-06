const { fetchUsers } = require("../models/users.models");

const getUsers = (request, response, next) => {
  return fetchUsers()
    .then((users) => {

      response.status(200).send({ users });
    })
    .catch((err) => {
      console.error("hello from users controller");
      next(err);
    });
};

module.exports = { getUsers };
