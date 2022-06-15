const express = require("express");
const Prof = require("../Models/Prof");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Feedback = require("../Models/Feedback");
const router = express.Router();
const accessProf = require("../Middlewares/accessProf");
const isAuth = require("../Middlewares/passport");
const Registre = require("../Models/Registre");
const Eleve = require("../Models/Eleve");

//Prof LOGIN
router.post("/loginProf", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existProf = await Prof.findOne({ email });
    if (!existProf) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const matched = await bcrypt.compare(password, existProf.password);
    if (!matched) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const payload = {
      _id: existProf._id,
    };
    const token = await jwt.sign(payload, process.env.secretKey);
    const loginProf = await Prof.findOne({email}).select(
      "-password"
    );
    res.cookie("token", token, { httpOnly: true });
    res.send({
      parent: loginProf,
      token: `Bearer ${token}`,
      msg: "successfully connected",
    });
  } catch (error) {
    res.status(400).send({ msg: "not connected" });
    console.log(error);
  }
});

//Get all Registre
router.get("/registre",isAuth(),accessProf, async (req, res) => {
   try {
     const registre = await Registre.find();
     res.status(200).send(registre);
   } catch (error) {
     res.status(400).send({ msg: "did not get registre" });
     console.log(error);
   }
});

//Get Eleves by classe
router.get("/eleves/:classe",isAuth(),accessProf, async(req,res)=>{
    try {
        const classe = await Eleve.find({classe:req.params.classe})
        res.status(200).send(classe);
    } catch (error) {
        res.status(400).send({ msg: "did not get classe" });
        console.log(error);
    }
})

//Abscence 
router.put("/eleves/:identifiant",isAuth(),accessProf, async(req,res)=>{
    try {
        const abseleve = await Eleve.findOne({identifiant:req.params.identifiant})
        if(abseleve.abscence==false){
      Object.assign(abseleve, abseleve.abscence=true);
        await abseleve.save();
    }
      else{
      Object.assign(abseleve, abseleve.abscence=false);
        await abseleve.save();
    }    
        await abseleve.save();
        res.status(200).send({
          Eleve: abseleve,
          msg: "absence sent successfully !",
        });
    } catch (error) {
        res.status(400).send({ msg: "did not send absence" });
        console.dir(error);
    }
})
//Sceance et abscence registre
router.post("/registre/:classe",isAuth(),accessProf,async (req,res)=>{
      try {
        
        newRegistre= new Registre(req.body);
        newRegistre.prof=req.user._id
        newRegistre.classe=req.params.classe
        newRegistre.matiere=req.user.matiere
        await newRegistre.save();
        res.status(200).send({msg:"Registre sent successfully",Registre: newRegistre})
      } catch (error) {
        res.status(400).send({ msg: "did not send attendance" });
        console.dir(error);
      }
})
//Exclu
router.put("/exclu/:identifiant", isAuth(),accessProf,  async (req, res) => {
  try {
    const prof = await Prof.findById(req.user._id)

    let  exclueleve = await Eleve.findOne({
      identifiant: req.params.identifiant,
    });
    const exclu = exclueleve.exclu
    //length of an array
     //if(condition avec id de prof && date de la sceance avec date jour)
     if (exclu[i].prof != req.user._id && exclu[i].date.toDateString()!=new Date().toDateString()){
       Object.assign(exclueleve, (exclueleve.abscence = true));
       exclueleve.exclu.unshift({
         prof: req.user._id,
         description:req.body
         
       });
    console.log(exclueleve)
    await exclueleve.save();
    res.status(200).send({
      Eleve: exclueleve,
      msg: "exclu sent successfully !",
    });
  }

    await exclueleve.save();
    res.status(200).send({
      Eleve: exclueleve,
      msg: "exclu sent successfully !",
    });
  } catch (error) {
    res.status(400).send({ msg: "did not send exclu" });
    console.dir(error);
    console.log(req.user._id);
  }
});


//CURRENT USER
router.get("/currentUser", isAuth(), (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
