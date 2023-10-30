"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Response.belongsTo(models.Survey, { foreignKey: "survey_id" });
      Response.hasMany(models.Answer, { foreignKey: "answer_id" });
    }
  }
  Response.init(
    {
      survey_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Response",
    }
  );
  return Response;
};
