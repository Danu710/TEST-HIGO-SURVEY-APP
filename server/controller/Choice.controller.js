const { Choice, Question, Answer } = require("../models");

const ChoiceController = {
  getAllChoices: async (req, res) => {
    const choices = await Choice.findAll({
      attributes: ["id", "text", "question_id"],
    });
    return res.status(200).json(choices);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const choice = await Choice.findByPk(id, {
      attributes: ["id", "text", "question_id"],
    });
    return res.status(200).json(choice);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const choice = await Choice.findByPk(id, {
      attributes: ["id", "text", "question_id"],
    });
    await choice.destroy();
    return res.status(200).json(choice);
  },

  create: async (req, res) => {
    const { text, question_id } = req.body;
    const choice = await Choice.create(
      { text, question_id },
      {
        returning: ["id"],
      }
    );
    return res.status(200).json(choice);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { text, question_id } = req.body;
    const choice = await Choice.findByPk(id, {
      attributes: ["id", "text", "question_id"],
    });
    choice.text = text;
    choice.question_id = question_id;
    await choice.save();
    return res.status(200).json(choice);
  },
};

module.exports = ChoiceController;
