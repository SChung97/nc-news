const express = require("express");
const { getEndPointsJSON } = require("./controllers/api.controller");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api", getEndPointsJSON);
app.get("/api/topics", getTopics);

module.exports = app;
