const todoService = require('../services/todo.service');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all todos
// @route   GET /api/v1/todos
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single todo
// @route   GET /api/v1/todos/:id
exports.getTodo = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    
    if (!todo) {
      return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new todo
// @route   POST /api/v1/todos
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update todo
// @route   PUT /api/v1/todos/:id
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    
    if (!todo) {
      return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete todo
// @route   DELETE /api/v1/todos/:id
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);
    
    if (!todo) {
      return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Partially update todo
// @route   PATCH /api/v1/todos/:id
exports.partialUpdateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.partialUpdateTodo(req.params.id, req.body);
    
    if (!todo) {
      return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (err) {
    next(err);
  }
};