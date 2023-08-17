const path = require('path');

const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');

//Loading Page
router.get('/', todoController.getAddTodoItem);

//Add item
router.post('/add-item', todoController.postAddTodoItem);

//Update item from remaining to done
router.put('/done-todo/:id', todoController.editTodoItem);

//Delete item
router.delete('/delete-item/:id', todoController.deleteTodoItem);

module.exports = router;