const { Response, Survey, Answer } = require("../models");

const ResponseController = {
  getAllResponses: async (req, res) => {
    const responses = await Response.findAll({
      attributes: ["id", "survey_id"],
    });
    return res.status(200).json(responses);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const response = await Response.findByPk(id, {
      attributes: ["id", "survey_id"],
    });
    return res.status(200).json(response);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const response = await Response.findByPk(id, {
      attributes: ["id", "survey_id"],
    });
    await response.destroy();
    return res.status(200).json(response);
  },

  create: async (req, res) => {
    const { survey_id } = req.body;
    const response = await Response.create(
      { survey_id },
      {
        returning: ["id"],
      }
    );
    return res.status(200).json(response);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { survey_id } = req.body;
    const response = await Response.findByPk(id, {
      attributes: ["id", "survey_id"],
    });
    response.survey_id = survey_id;
    await response.save();
    return res.status(200).json(response);
  },
};

module.exports = ResponseController;
