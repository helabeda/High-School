const accessParent = (req, res, next) => {
  if (req.parent && req.parent.role !== "parent") {
    res.status(400).send({ msg: "not auth parent" });
  } else {
    next();
    console.log(req.parent)
  }
};

module.exports = accessParent;
