const express = require("express");
const router = express.Router();
const SurveyController = require("../controller/Survey.controller");

router.get("/", SurveyController.getAllSurveys);
router.get("/:id", SurveyController.getById);
router.post("/", SurveyController.create);
router.put("/:id", SurveyController.update);
router.delete("/:id", SurveyController.delete);

module.exports = router;
