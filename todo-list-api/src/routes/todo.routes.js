const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.route('/')
  .get(todoController.getTodos)
  .post(todoController.createTodo);

router.route('/:id')
  .get(todoController.getTodo)
  .put(todoController.updateTodo)
  .patch(todoController.partialUpdateTodo) // Add this line
  .delete(todoController.deleteTodo);

module.exports = router;