const express = require("express");
const Parent = require("../Models/Parent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Feedback = require("../Models/Feedback");
const router = express.Router();
const accessParent = require("../Middlewares/accessParent");
const isAuth =require("../Middlewares/passport");
const Registre = require("../Models/Registre");
const { feedbackRegisterCheck } = require("../Middlewares/validator");

//Parents LOGIN
router.post("/loginParents", async (req, res) => {
      const { identifiant, password } = req.body;
      try {
        const existParent = await Parent.findOne({ identifiant });
        if (!existParent) {
          return res.status(400).send({ msg: "bad credential" });
        }
        const matched = await bcrypt.compare(password, existParent.password);
        if (!matched) {
          return res.status(400).send({ msg: "bad credential" });
        }
        const payload = {
          _id: existParent._id,
        };
        const token = await jwt.sign(payload, process.env.secretKey);
        const loginParent = await Parent.findOne({ identifiant }).select(
          "-password"
        );
        res.cookie("token", token, { httpOnly: true });
        res.send({
          parent: loginParent,
          token: `Bearer ${token}`,
          msg: "successfully connected",
        });
      } catch (error) {
        res.status(400).send({ msg: "not connected" });
        console.log(error);
      }
});

//Get Registre
router.get("/registre/:identifiant",isAuth(), accessParent ,async (req, res) => {
   try {
     const registre = await Registre.find({ identifiant: req.params.identifiant });
     res.status(200).send(registre);
   } catch (error) {
     res.status(400).send({ msg: "did not get registre" });
     console.log(error);
   }
});

// Send Feedback PARENTS
router.post("/createFeedback",isAuth(), accessParent, feedbackRegisterCheck()  ,async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
     newFeedback.parent = req.user._id;
    await newFeedback.save();
    res.status(200).send({ msg: "Feedback Successfully added", Feedback: newFeedback });
  } catch (error) {
    res.status(400).send({ msg: "Nothing to Add" });
    console.log(error)
  }
});

//Get Registre



//CURRENT USER
router.get("/currentUser", isAuth(), (req, res) => {
  res.send({ user: req.user });
});


module.exports = router;