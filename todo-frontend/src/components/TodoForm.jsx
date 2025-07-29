import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, completed: false });
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" startIcon={<AddIcon />}>
        Add
      </Button>
    </Box>
  );
};