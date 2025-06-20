# NC News

Visit the hosted version of NC News here: https://nc-news-zgkw.onrender.com

NC News is a new app designed to emulate a Reddit adjacent platform. This app makes use of PostgreSQL to create tables, seed our data and serve it to construct a RESTful server using Node.js with Express.js. Express.js handles any requests, interacts with the seeded database and performs complex queries. Jest and Supertest are used to handle our errors

Getting started:
1 - Start by cloning the prject from GitHub: https://github.com/SChung97/nc-news
2 - Ensure you have the minimum versions of Node.js and PostgreSQL are installed
3 - Install dependencies using 'npm install'
4 - Create your local development and test databases

Instructions for accessing the required environment variables locally after initial cloning of nc-news project are here:
1 - Create two .env files named: .env.test and .env.development
2 - Within each .env file add PGDATABASE = example_database_name to connect to the corresponding database
3 - Check .gitignore folder to see if .env.\* are included

eg / within .env.test: PGDATABASE=database_test

Populate your local databases by running 'npm run seed'
Run the project via 'npm start'
Run tests using 'npm test'
