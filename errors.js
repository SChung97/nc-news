handlePostgresErrors = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Error - bad request" });
  } else {
    next(err);
  }
};

handleCustomErrors = (err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: "Error - article not found" });
  } else {
    next(err);
  }
};

handleServerErrors = (err, request, response, next) => {
  console.error(err, "< from the error handle");
  response.status(500).send({ msg: "Internal server error" });
};

module.exports = {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors,
};
