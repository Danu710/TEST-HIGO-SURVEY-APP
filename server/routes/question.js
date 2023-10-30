const express = require("express");
const router = express.Router();
const QuestionController = require("../controller/Question.controller");

router.get("/", QuestionController.getAllQuestions);
router.get("/:id", QuestionController.getById);
router.post("/", QuestionController.create);
router.put("/:id", QuestionController.update);
router.delete("/:id", QuestionController.delete);

module.exports = router;
