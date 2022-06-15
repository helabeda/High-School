const accessAdmin = (req, res, next) => {
  if (req.user&& req.user.role!=="superadmin") {
    res.status(400).send({ msg: "not auth administration" });
  } else if (req.admin && req.admin.role !== "admin"){
    res.status(400).send({ msg: "not auth administration" });
  } else{
next()  }
};

module.exports = accessAdmin;
