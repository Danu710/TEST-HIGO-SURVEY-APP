"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      response_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Responses",
          key: "id",
        },
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      choice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Choices",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Answers");
  },
};
