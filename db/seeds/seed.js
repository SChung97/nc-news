const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, createLookUpObject } = require("./utils");
const articles = require("../data/test-data/articles");
const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db
        .query(
          `CREATE TABLE topics(slug VARCHAR(65) PRIMARY KEY NOT NULL, description VARCHAR(50) NOT NULL, img_url VARCHAR(1000))`
        )
        .then(() => {
          return db.query(
            `CREATE TABLE users(username VARCHAR(60) PRIMARY KEY NOT NULL, name VARCHAR(60) NOT NULL, avatar_URL varchar(1000))`
          );
        })
        .then(() => {
          return db.query(
            `CREATE TABLE articles(article_id SERIAL PRIMARY KEY NOT NULL, title VARCHAR(60) NOT NULL, topic VARCHAR(70) NOT NULL REFERENCES topics(slug), author VARCHAR(60) NOT NULL REFERENCES users(username), body TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))`
          );
        })
        .then(() => {
          return db.query(
            `CREATE TABLE comments(comment_id SERIAL PRIMARY KEY NOT NULL, article_id INT REFERENCES articles(article_id) ON DELETE CASCADE, body TEXT NOT NULL, votes INT DEFAULT 0, author VARCHAR(60) NOT NULL REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
          );
        })
        .then(() => {
          const topicsArray = topicData.map(
            ({ slug, description, img_url }) => {
              return [slug, description, img_url];
            }
          );
          const sqlTopics = format(
            `INSERT INTO topics(slug, description, img_url) VALUES %L RETURNING *`,
            topicsArray
          );
          return db.query(sqlTopics);
        })
        .then(() => {
          const usersArray = userData.map(({ username, name, avatar_url }) => {
            return [username, name, avatar_url];
          });
          const sqlUsers = format(
            `INSERT INTO users(username, name, avatar_url) VALUES %L RETURNING *`,
            usersArray
          );
          return db.query(sqlUsers);
        })
        .then(() => {
          const articlesArray = articleData.map(
            ({
              title,
              topic,
              author,
              body,
              created_at,
              votes = 0,
              article_img_url,
            }) => {
              return [
                title,
                topic,
                author,
                body,
                convertTimestampToDate({ created_at }).created_at,
                votes,
                article_img_url,
              ];
            }
          );
          const sqlArticles = format(
            `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
            articlesArray
          );
          return db.query(sqlArticles);
        })
        .then((articlesInsert) => {
          const lookUpObj = createLookUpObject(
            articlesInsert.rows,
            "title",
            "article_id"
          );
          const commentsArray = commentData.map(
            ({ body, votes = 0, author, article_id, users, created_at }) => {
              return [
                lookUpObj[article_id],
                body,
                votes,
                author,
                convertTimestampToDate(created_at).created_at,
              ];
            }
          );
          const sqlComments = format(
            `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L RETURNING *`,
            commentsArray
          );
          return db.query(sqlComments);
        });
    });
};

//<< write your first query in here.

module.exports = seed;
//For this task you should create tables for topics, users, articles, and comments. Make sure to consider the order in which you create your tables, and make sure this file succeeds if you run it more than once. You should think about whether you require any constraints on your table columns (e.g. 'NOT NULL'), and make sure each one is given a relevant data type. You can explore the Postgres docs on data types. There is also a nice summary on Geeks for Geeks.
