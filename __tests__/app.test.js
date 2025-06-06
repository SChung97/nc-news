const endpointsJson = require("../endpoints.json");
const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object containing a topics key and an array of topic objects as its value", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
        expect(topics.length).not.toBe(0);
      });
  });
});

describe("articles", () => {
  describe("GET /api/articles", () => {
    test("200: Responds with an object containing an articles key and an array of article objects as its value", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("number");
            expect(article.property).not.toBe(body);
          });
          expect(articles.length).not.toBe(0);
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: Responds with an object containing an article key and the value of an article object", () => {
      const articleId = 9;
      return request(app)
        .get(`/api/articles/${articleId}`)
        .expect(200)
        .then(({ body }) => {
          const {
            author,
            title,
            article_id,
            body: article_body_contents,
            topic,
            created_at,
            votes,
            article_img_url,
          } = body.article;

          expect(typeof author).toBe("string");
          expect(typeof title).toBe("string");
          expect(article_id).toBe(9);
          expect(typeof article_body_contents).toBe("string");
          expect(typeof topic).toBe("string");
          expect(typeof created_at).toBe("string");
          expect(typeof votes).toBe("number");
          expect(typeof article_img_url).toBe("string");
        });
    });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an object containing a key of comments and an array of comments for the given article_id as its value", () => {
    return request(app)
      .get(`/api/articles/1/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          expect(comment.article_id).toBe(1);
        });
        expect(comments.length).not.toBe(0);
      });
  });
  test("200: Responds with an object containing a key of comments and an empty array of comments as its value if any given article has no comments", () => {
    return request(app)
      .get(`/api/articles/8/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(0);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with a newly posted comment", () => {
    const articleId = 3;
    const newComment = {
      username: "rogersop",
      body: "This is a new comment",
    };
    return request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const {
          comment_id,
          votes,
          created_at,
          author,
          body: new_comment_body,
          article_id,
        } = body.comment;

        expect(typeof comment_id).toBe("number");
        expect(typeof votes).toBe("number");
        expect(typeof created_at).toBe("string");
        expect(typeof author).toBe("string");
        expect(typeof new_comment_body).toBe("string");
        expect(article_id).toBe(3);
      });
  });
});
describe("GET /api/users", () => {
  test("200: Responds with an object containing an articles key and an array of user objects as its value", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
        expect(users.length).not.toBe(0);
      });
  });
});

describe("Postgres errors", () => {
  test("400: Responds with 'bad request' when article_id is not a number", () => {
    return request(app)
      .get("/api/articles/notANumber")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Error - bad request");
      });
  });
});

describe("Custom errors", () => {
  test('404: Responds with "path not found" when path does not exist', () => {
    return request(app)
      .get("/api/nonexistent-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Error - path not found");
      });
  });
  test("404: Responds with 'not found' when article_id is an invalid number", () => {
    const invalidNumber = 707;
    return request(app)
      .get(`/api/articles/${invalidNumber}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Error - article not found");
      });
  });
});
