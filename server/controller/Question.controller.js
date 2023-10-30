const { Survey, Question } = require("../models");

const QuestionController = {
  getAllQuestions: async (req, res) => {
    const questions = await Question.findAll({
      attributes: ["id", "text", "survey_id"],
    });
    return res.status(200).json(questions);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const question = await Question.findByPk(id, {
      attributes: ["id", "text", "survey_id"],
    });
    return res.status(200).json(question);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const question = await Question.findByPk(id, {
      attributes: ["id", "text", "survey_id"],
    });
    await question.destroy();
    return res.status(200).json(question);
  },

  create: async (req, res) => {
    try {
      const { text, survey_id } = req.body;
      const question = await Question.create(
        { text, survey_id },
        {
          returning: ["id"],
        }
      );
      return res.status(200).json(question);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { text, survey_id } = req.body;
    const question = await Question.findByPk(id, {
      attributes: ["id", "text", "survey_id"],
    });
    question.text = text;
    question.survey_id = survey_id;
    await question.save();
    return res.status(200).json(question);
  },
};

module.exports = QuestionController;
