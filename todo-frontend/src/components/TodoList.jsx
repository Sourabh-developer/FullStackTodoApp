import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { List, CircularProgress, Typography } from '@mui/material';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, loading } = useContext(TodoContext);

  if (loading) return <CircularProgress />;
  if (!todos.length) return <Typography>No todos yet. Add one!</Typography>;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </List>
  );
};