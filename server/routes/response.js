const express = require("express");
const router = express.Router();
const ResponseController = require("../controller/Response.controller");

router.get("/", ResponseController.getAllResponses);
router.get("/:id", ResponseController.getById);
router.post("/", ResponseController.create);
router.put("/:id", ResponseController.update);
router.delete("/:id", ResponseController.delete);

module.exports = router;
