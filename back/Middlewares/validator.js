const { check, validationResult } = require("express-validator");

exports.adminRegisterCheck = () => [
  check("email", "this field must be a valid email").isEmail(),
  check("nom", "Nom is required").notEmpty(),
  check("prenom", "Nom is required").notEmpty(),
  check("password", "password should have 8 chars").isLength({ min: 8 }),
];

exports.profRegisterCheck = () => [
  check("email", "this field must be a valid email").isEmail(),
  check("nom", "Nom is required").notEmpty(),
  check("prenom", "Prenom is required").notEmpty(),
  check("password", "password should have 8 chars").isLength({ min: 8 }),
];

exports.parentRegisterCheck = () => [
  check("identifiant", "identifiant is required").notEmpty(),
  check("nom", "nom is required").notEmpty(),
  check("prenom", "prenom is required").notEmpty(),
  check("password", "password should have 8 chars").isLength({ min: 8 }),
  check("number", "number should have 8 chars").isLength({ min: 8 }),
];

exports.eleveRegisterCheck = () => [
  check("identifiant", "identifiant is required").notEmpty(),
  check("nom", "Nom is required").notEmpty(),
  check("prenom", "Prenom is required").notEmpty(),
  check("classe", "Classe is required").notEmpty(),
];

exports.feedbackRegisterCheck = () => [
  check("feedback", "Feedback is required").notEmpty(),
];

exports.responseRegisterCheck = () => [
  check("response", "Response is required").notEmpty(),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};
