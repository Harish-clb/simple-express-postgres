const isValidId = async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ message: "Invalid id. id should be an integer" });
  }
  next();
};

module.exports = {
  isValidId,
};
