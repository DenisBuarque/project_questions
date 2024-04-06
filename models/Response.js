const Sequelize= require('sequelize');
const connection = require('../database/connection');

const Response = connection.define('responses', {
    body : {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
// Create table in batabase
//Response.sync({force: false}).then(() => {});

module.exports = Response;