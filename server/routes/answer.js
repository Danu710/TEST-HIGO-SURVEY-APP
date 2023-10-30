const express = require("express");
const router = express.Router();
const AnswerController = require("../controller/Answer.controller");

router.get("/", AnswerController.getAllAnswers);
router.get("/:id", AnswerController.getById);
router.post("/", AnswerController.create);
router.put("/:id", AnswerController.update);
router.delete("/:id", AnswerController.delete);

module.exports = router;
