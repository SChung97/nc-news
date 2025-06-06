const db = require("../db/connection");

const fetchCommentsByArticle = (article_id) => {
  console.log("hello from comments model");
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { fetchCommentsByArticle };
