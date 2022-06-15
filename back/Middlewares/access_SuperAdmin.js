const access_SuperAdmin = (req, res, next) => {
  if (req.user.role === "superadmin") {
    next();
  } else  {
    res.status(400).send({ msg: "not auth administration" });
  }
};

module.exports = access_SuperAdmin;

