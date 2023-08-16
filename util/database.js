const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo-list', 'root', 'root', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;