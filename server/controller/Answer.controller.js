const { Answer, Response, Question, Choice } = require("../models");

const AnswerController = {
  getAllAnswers: async (req, res) => {
    const answers = await Answer.findAll();
    return res.status(200).json(answers);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);
    return res.status(200).json(answer);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const answer = await Answer.findByPk(id);
    await answer.destroy();
    return res.status(200).json(answer);
  },

  create: async (req, res) => {
    const { text, question_id } = req.body;
    const answer = await Answer.create({ text, question_id });
    return res.status(200).json(answer);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { text, question_id } = req.body;
    const answer = await Answer.findByPk(id);
    answer.text = text;
    answer.question_id = question_id;
    await answer.save();
    return res.status(200).json(answer);
  },
};

module.exports = AnswerController;
