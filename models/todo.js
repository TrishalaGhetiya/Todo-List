const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Todo = sequelize.define('todoList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      item:{
        type: Sequelize.STRING 
      },
      description:{
        type: Sequelize.TEXT
      },
      isChecked: {
        type: Sequelize.STRING
      }
});

module.exports = Todo;