"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Choice.hasOne(models.Question, { foreignKey: "question_id" });
      Choice.hasMany(models.Answer, { foreignKey: "answer_id" });
    }
  }
  Choice.init(
    {
      text: DataTypes.STRING,
      question_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Choice",
    }
  );
  return Choice;
};
