const db = require("../db/connection");

const fetchArticles = () => {
  console.log("hello from articles model");
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id):: INT AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};

module.exports = { fetchArticles };
