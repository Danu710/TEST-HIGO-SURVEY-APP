const express = require("express");
const router = express.Router();
const surveyRoute = require("./survey");
const choiceRoute = require("./choice");
const questionRoute = require("./question");
const responseRoute = require("./response");

router.use("/survey", surveyRoute);
router.use("/question", questionRoute);
router.use("/choice", choiceRoute);
router.use("/response", responseRoute);

module.exports = router;
