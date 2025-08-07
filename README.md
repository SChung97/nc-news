
# NC News - Backend

A RESTful API for a news app designed to emulate a Reddit adjacent platform. Users can:

- View a list of all articles that can be sorted by date published, number of comments, vote count and/or ordered by descending or ascending
- Filter articles by topic
- Upvote/downvote articles
- Leave comments when logged in
- Delete reviews they've made

🟢 Live API - https://nc-news-zgkw.onrender.com/api

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Jest & Supertest
- Jest-extended
- Husky for Git hooks
- CORS middleware for cross-origin requests
- PG and PG-Format
- Nodemon

## Setup

Please ensure that the minimum versions of Node.js and PostgreSQL have been installed. For the purposes of this 

1. Clone repository:

```bash
git clone https://github.com/SChung97/nc-news
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables
   Create the following .env files in the root of the project

- .env.development
- .env.test
- .env.production

- check .env.\* are included within the .gitignore files

```bash
# .env.development
PGDATABASE=nc_news
```

```bash
# .env.test
PGDATABASE=nc_news_test
```

```bash
# .env.production
DATABASE_URL=your_production_database_url_here
```

4. Set up databases:

```bash
npm run setup-dbs
```

5. Seed databases

- For development / testing:

```bash
npm run seed
```

- For production:

```bash
npm run seed-prod
```

6. Run tests:

```bash
npm test
```