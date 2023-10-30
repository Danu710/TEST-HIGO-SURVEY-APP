"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Survey.hasMany(models.Question, { foreignKey: "survey_id" });
      Survey.hasMany(models.Response, { foreignKey: "response_id" });
    }
  }
  Survey.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Survey",
    }
  );
  return Survey;
};
