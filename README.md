# NC News Seeding

Instructions for accessing the required environment variables locally after initial cloning of nc-news project are here.
1 - Check .gitignore folder to see if .env.\* are included
2- Create two .env files named: .env.test and .env.development
3- Within each .env file add PGDATABASE = example_database_name to connect to the corresponding database

eg/ within .env.test: PGDATABASE=database_test
