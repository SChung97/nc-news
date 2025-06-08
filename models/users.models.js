const { response } = require("../app");
const db = require("../db/connection");

const fetchUsers = () => {
  console.log("hello from users model");
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchUsers };
