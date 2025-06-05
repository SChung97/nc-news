const { fetchUsers } = require("../models/users.models");

const getUsers = (request, response, next) => {
  console.log("hello from users controller");
  return fetchUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers };
