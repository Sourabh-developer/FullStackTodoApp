import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/todos';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data.data;
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export const updateTodoTitle = async (id, newTitle) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${id}`,
      { title: newTitle },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('PATCH Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      id: id
    });
    throw error;
  }
};