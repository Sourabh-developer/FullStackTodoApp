import { createContext, useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, updateTodoTitle } from '../api/todoApi';
import { toast } from 'react-toastify';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const todos = await getTodos();
      setTodos(todos);
    } catch (error) {
      toast.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos([...todos, newTodo]);
      toast.success('Todo added successfully!');
    } catch (error) {
      toast.error('Failed to add todo');
    }
  };

  // In TodoContext.jsx
const editTodoTitle = async (id, newTitle) => {
  try {
    const updatedTodo = await updateTodoTitle(id, newTitle);
    
    // Update the state immediately
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, title: newTitle } : todo
    ));
    
    toast.success('Todo updated successfully!');
    return updatedTodo;
  } catch (error) {
    toast.error(error.message || 'Failed to update todo');
    throw error;
  }
};

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const updatedTodo = await updateTodo(id, {
        completed: !todoToUpdate.completed
      });
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Todo deleted!');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  return (
    <TodoContext.Provider value={{ todos, loading, addTodo, toggleComplete, removeTodo ,editTodoTitle}}>
      {children}
    </TodoContext.Provider>
  );
};