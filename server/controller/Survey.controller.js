const { Survey, Question } = require("../models");

const SurveyController = {
  getAllSurveys: async (req, res) => {
    const surveys = await Survey.findAll();
    return res.status(200).json(surveys);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const survey = await Survey.findByPk(id);
    const question = await Question.findAll({
      where: { survey_id: survey.id },
      attributes: ["id", "text", "survey_id"],
    });
    return res.status(200).json({ survey, question });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const survey = await Survey.findByPk(id);
    survey.title = title;
    survey.description = description;
    await survey.save();
    return res.status(200).json(survey);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const survey = await Survey.findByPk(id);
    await survey.destroy();
    return res.status(200).json(survey);
  },

  create: async (req, res) => {
    const { title, description } = req.body;
    const survey = await Survey.create({ title, description });
    return res.status(200).json(survey);
  },
};

module.exports = SurveyController;
