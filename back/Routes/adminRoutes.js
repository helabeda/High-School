const express = require("express");
const Parent = require("../Models/Parent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Feedback = require("../Models/Feedback");
const router = express.Router();
const accessParent = require("../Middlewares/accessParent");
const accessAdmin = require("../Middlewares/accessAdmin");
const access_SuperAdmin = require("../Middlewares/access_SuperAdmin");
const isAuth = require("../Middlewares/passport");
const Registre = require("../Models/Registre");
const Administration = require("../Models/Administration");
const Prof = require("../Models/Prof");
const {
  profRegisterCheck,
  parentRegisterCheck,
  adminRegisterCheck,
  responseRegisterCheck,
  validator,
  eleveRegisterCheck,
} = require("../Middlewares/validator");


//Administration LOGIN
router.post("/loginadmin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existAdmin = await Administration.findOne({ email });
    if (!existAdmin) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const matched = await bcrypt.compare(password, existAdmin.password);
    if (!matched) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const payload = {
      _id: existAdmin._id,
    };
    const token = await jwt.sign(payload, process.env.secretKey);
    const loginAdmin = await Administration.findOne({ email }).select(
      "-password"
    );
    res.cookie("token", token, { httpOnly: true });
    res.send({
      Administration: loginAdmin,
      token: `Bearer ${token}`,
      msg: "successfully connected",
    });
  } catch (error) {
    res.status(400).send({ msg: "not connected" });
    console.log(error)
  }
});

// Get Registre
router.get("/registre/:identifiant",isAuth(),accessParent,async (req, res) => {
    try {
      const registre = await Registre.find({
        identifiant: req.params.identifiant,
      });
      res.status(200).send(registre);
    } catch (error) {
      res.status(400).send({ msg: "did not get registre" });
      console.log(error);
    }
  }
);

//Update eleve
router.put("/eleve/:identifiant", isAuth(),accessAdmin, async (req, res) => {
  try {
    const updateEleve = await Eleve.findOne({identifiant:req.params.identifiant});

    const Eleveupdated = Object.assign(updateEleve, req.body);

  
    await Eleveupdated.save();
    res
      .status(200)
      .send({ Eleve: Eleveupdated, msg: "Eleve updated successfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log("error");
  }
});

//Delete eleve
router.delete("/eleve/:identifiant", isAuth(), accessAdmin, async (req, res) => {
  try {
     await Eleve.deleteOne({
      identifiant: req.params.identifiant,
    });
    res
      .status(200)
      .send({  msg: "Eleve deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log("error");
  }
});

//Update prof
router.put("/prof/:id", isAuth(),accessAdmin, async (req, res) => {
  try {
    const updateProf = await Prof.findById(req.params.id);

    const updatedProf = Object.assign(updateProf, req.body);

  
    await updatedProf.save();
    res
      .status(200)
      .send({ Prof: updatedProf, msg: "Prof updated successfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//Delete prof
router.delete("/prof/:id", isAuth(), accessAdmin, async (req, res) => {
  try {
    await Prof.deleteOne({
      _id: req.params.id,
    });
    res
      .status(200)
      .send({  msg: "Prof deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
    console.log("error");
  }
});

// Get all Feedbacks PARENTS
router.get("/feedbacks", isAuth(), accessAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ updatedAt: -1 });
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(400).send({ msg: "Nothing to Add" });
  }
});

//Get Feedbacks by ID PARENTS
router.get("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(400).send({ msg: "did not get feedback" });
    console.log(error);
  }
});

//Send response to  PARENTS
router.put("/response/:id",isAuth(),accessAdmin,responseRegisterCheck(),async (req, res) => {
    try {
      const responseFeedback = await Feedback.findById(req.params.id);
      Object.assign(responseFeedback, req.body);
      await responseFeedback.save();
      res.status(200).send({
        Feedback: responseFeedback,
        msg: "Response sent successfully !",
      });
      console.log(req.body);
    } catch (error) {
      res.status(400).send({ msg: "Nothing to send" });
      console.log(error);
    }
  }
); 

//Get Eleves by classe
router.get("/eleves/:classe", isAuth(), accessAdmin, async (req, res) => {
  try {
    const classe = await Eleve.find({ classe: req.params.classe });
    res.status(200).send(classe);
  } catch (error) {
    res.status(400).send({ msg: "did not get classe" });
    console.log(error);
  }
}); 

//Billet
router.put("/billet/:identifiant",isAuth(),accessAdmin,async (req, res) => {
    try {
      const billet = await Eleve.findOne({
        identifiant: req.params.identifiant,
      });
      if (billet.abscence == true) {
        Object.assign(billet, (billet.abscence = false));
        await billet.save();
      }
      billet.billet.unshift({ admin: req.user._id, date: Date.now() });
      await billet.save();
      res.status(200).send({
        Eleve: billet,
        msg: "billet sent successfully !",
      });
    } catch (error) {
      res.status(400).send({ msg: "did not send billet" });
      console.dir(error);
      console.log(req.user._id);
    }
  }
);

//SignUp ADMIN
router.post(
  "/adminsignup",
  isAuth(),
  access_SuperAdmin,
  adminRegisterCheck(),
  validator,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundAdmin = await Administration.findOne({ email });
      if (foundAdmin) {
        return res.status(400).send({ msg: "admin Already Exists" });
      }
      console.log(req.administration);

      const newAdmin = new Administration(req.body);
      const hashedPassword = await bcrypt.hash(password, 8);
      newAdmin.password = hashedPassword;
      await newAdmin.save();
      res.send({ msg: "Successfully added", admin: newAdmin });
    } catch (error) {
      res.status(400).send({ msg: "Nothing to Add" });
      console.log(error);
    }
  }
);

//SignUp PROF
router.post("/profsignup",isAuth(),access_SuperAdmin,profRegisterCheck(),validator,async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundProf = await Prof.findOne({ email });
      if (foundProf) {
        return res.status(400).send({ msg: "prof Already Exists" });
      }
      const newProf = new Prof(req.body);
      const hashedPassword = await bcrypt.hash(password, 8);
      newProf.password = hashedPassword;
      await newProf.save();
      res.send({ msg: "Successfully added", prof: newProf });
    } catch (error) {
      res.status(400).send({ msg: "Nothing to Add" });
      console.log(req.user)
      console.log(error)
    }
  }
);

//SignUp PARENT
router.post(
  "/parentsignup",
  isAuth(),
  access_SuperAdmin,
  parentRegisterCheck(),
  validator,
  async (req, res) => {
    const { identifiant, password } = req.body;
    try {
      const foundParent = await Parent.findOne({ identifiant });
      if (foundParent) {
        return res.status(400).send({ msg: "Parent already exist" });
        console.log(error)
      }
      const newParent = new Parent(req.body);
      const hashedPassword = await bcrypt.hash(password, 8);
      newParent.password = hashedPassword;
      await newParent.save();
      res.send({ msg: "Successfully added", parent: newParent });
    } catch (error) {
      res.status(400).send({ msg: "Nothing to Add" });
      console.log(error)
    }
  }
);

//SignUp Eleves
router.post(
  "/elevessignup",
  isAuth(),
  accessAdmin,
  eleveRegisterCheck(),
  validator,
  async (req, res) => {
    const { identifiant } = req.body;
    try {
      const foundEleve = await Eleve.findOne({ identifiant });
      if (foundEleve) {
        return res.status(400).send({ msg: "Eleve Already Exists" });
      }
      const newEleve = new Eleve(req.body);
      await newEleve.save();
      res.send({ msg: "Successfully added", eleve: newEleve });
    } catch (error) {
      res.status(400).send({ msg: "Nothing to Add" });
      console.log(error)
    }
  }
);



//CURRENT USER
router.get("/currentUser", isAuth(), (req, res) => {
  res.send({ user: req.user });
});


module.exports = router;