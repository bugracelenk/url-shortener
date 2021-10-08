module.exports = (promise) => {
  if (promise.then && promise.catch) {
    return promise
      .then((data) => [null, data])
      .catch((error) => {
        return [error];
      });
  } else if (typeof promise !== "function") {
    return [null, promise];
  } else {
    return ["Not a promise!"];
  }
};
