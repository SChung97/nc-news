const db = require("../db/connection");

const fetchTopics = () => {
  console.log("hello from topics model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

const checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Error - topic not found" });
      }
      return;
    });
};
module.exports = { fetchTopics, checkTopicExists };
