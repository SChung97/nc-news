const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookUpObject = (rowsObject, key, value) => {
  let lookupObj = {};
  const newArr = [...rowsObject];
  newArr.forEach((item) => {
    lookupObj[item[key]] = item[value];
  });
  return lookupObj;
};
