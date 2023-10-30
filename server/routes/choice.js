const express = require("express");
const router = express.Router();
const ChoiceController = require("../controller/Choice.controller");

router.get("/", ChoiceController.getAllChoices);
router.get("/:id", ChoiceController.getById);
router.post("/", ChoiceController.create);
router.put("/:id", ChoiceController.update);
router.delete("/:id", ChoiceController.delete);

module.exports = router;
