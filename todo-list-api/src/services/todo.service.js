const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async () => {
  return await Todo.find().sort({ createdAt: -1 });
};

// Get single todo
exports.getTodoById = async (id) => {
  return await Todo.findById(id);
};

// Create new todo
exports.createTodo = async (todoData) => {
  const todo = new Todo(todoData);
  return await todo.save();
};

// Update todo
exports.updateTodo = async (id, updateData) => {
  return await Todo.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

// Delete todo
exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

exports.partialUpdateTodo = async (id, updateData) => {
  return await Todo.findByIdAndUpdate(
    id,
    { $set: updateData }, // Only updates provided fields
    { new: true, runValidators: true }
  );
};