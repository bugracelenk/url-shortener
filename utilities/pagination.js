const setPagination = (skip, limit) => {
  return {
    limit: parseInt(limit || "0"),
    skip: parseInt(skip || "0") * parseInt(limit || "0"),
  };
};

module.exports = {
  setPagination,
};
