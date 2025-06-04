const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

const fetchTopics = () => {
  console.log("hello from topics model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchTopics };
