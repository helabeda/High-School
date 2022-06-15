const accessProf = (req, res, next) => {
  if (req.user.role != "prof") {
    res.status(400).send({ msg: "not auth prof" });
  } else {
    next();

  }
};


module.exports = accessProf;
