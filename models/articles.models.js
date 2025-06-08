const db = require("../db/connection");

const fetchArticles = () => {
  console.log("hello from articles model");
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id):: INT AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
};

const fetchArticleById = (id) => {
  console.log("hello from articles model");
  return db
    .query(
      `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url FROM articles WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Error - article not found",
        });
      }
      return article;
    });
};

const updateArticleVotes = (article_id, inc_votes) => {
  console.log("hello from articles model");
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [article_id, inc_votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
module.exports = { fetchArticles, fetchArticleById, updateArticleVotes };
