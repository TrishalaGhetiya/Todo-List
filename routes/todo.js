const path = require('path');

const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

router.get('/', todoController.getAddTodoItem);

router.post('/add-item', todoController.postAddTodoItem);

router.put('/done-todo/:id', todoController.editTodoItem);

router.delete('/delete-item/:id', todoController.deleteTodoItem);

module.exports = router;