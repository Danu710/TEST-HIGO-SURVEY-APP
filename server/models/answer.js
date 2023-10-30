"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Response, { foreignKey: "response_id" });
      Answer.belongsTo(models.Question, { foreignKey: "question_id" });
      Answer.belongsTo(models.Choice, { foreignKey: "choice_id" });
    }
  }
  Answer.init(
    {
      response_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      choice_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
