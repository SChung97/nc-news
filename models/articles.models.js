const db = require("../db/connection");

const fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  console.log("hello from articles model");
  const acceptableSort = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const acceptableOrder = ["asc", "desc"];
  if (!acceptableSort.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request - Invalid sort query",
    });
  }
  if (!acceptableOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request - Invalid order query",
    });
  }
  let queryString = `SELECT  articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id) AS INT) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const queryValues = [];
  if (topic) {
    queryString += ` WHERE articles.topic = $1`;
    queryValues.push(topic);
  }
  queryString += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;
  return db
    .query(queryString, queryValues)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      console.error("database query error", err);
      return Promise.reject(err);
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
