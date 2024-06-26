const Sequelize= require('sequelize');
const connection = require('../database/connection');

const Question = connection.define('questions', {
    title : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
// Create table in batabase
//Question.sync({force: false}).then(() => {});

module.exports = Question;