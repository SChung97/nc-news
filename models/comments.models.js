const db = require("../db/connection");
const { fetchArticleById } = require("./articles.models");
const { fetchSingleUser } = require("../models/users.models");

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

const removeCommentById = (comment_id) => {
  console.log("hello from comments model");
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error - comment not found",
        });
      }
      return;
    });
};

module.exports = { fetchCommentsByArticle, insertComment, removeCommentById };
