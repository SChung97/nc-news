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

const insertComment = (article_id, username, body) => {
  
  console.log("hello from comments model");
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      const comment = rows[0];
      return comment;
    });
};

module.exports = { fetchCommentsByArticle, insertComment };
