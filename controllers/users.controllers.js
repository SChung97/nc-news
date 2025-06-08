const { fetchUsers } = require("../models/users.models");

const getUsers = (request, response, next) => {
  console.log("hello from users controller");
  return fetchUsers()
    .then((users) => {
      console.log("sending users data", users);
      response.status(200).send({ users });
    })
    .catch((err) => {
      console.error("hello from users controller");
      next(err);
    });
};

module.exports = { getUsers };
