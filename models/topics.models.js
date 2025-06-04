const db = require("../db/connection");

const fetchTopics = () => {
  console.log("hello from topics model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchTopics };
