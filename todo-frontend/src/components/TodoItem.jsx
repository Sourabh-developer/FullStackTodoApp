import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box
} from '@mui/material';
import { Delete, Edit, Save, Close } from '@mui/icons-material';
import { updateTodoTitle } from '../api/todoApi';
import { toast } from 'react-toastify';

export const TodoItem = ({ todo }) => {
  const { toggleComplete, removeTodo, editTodoTitle } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = async () => {
    if (!editedTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
  
    try {
      await editTodoTitle(todo._id, editedTitle); // Use context function
      setIsEditing(false);
      // No need to manually update - context will handle it
    } catch (error) {
      setEditedTitle(todo.title); // Revert on error
    }
  };

  return (
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleComplete(todo._id)}
        disabled={isEditing}
      />

      {isEditing ? (
        <Box sx={{ display: 'flex', flexGrow: 1, gap: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
          <IconButton onClick={handleSave}>
            <Save />
          </IconButton>
          <IconButton onClick={() => {
            setIsEditing(false);
            setEditedTitle(todo.title);
          }}>
            <Close />
          </IconButton>
        </Box>
      ) : (
        <ListItemText
          primary={todo.title}
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.7 : 1
          }}
        />
      )}

      <Box sx={{ ml: 'auto' }}>
        {!isEditing && (
          <>
            <IconButton edge="end" onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" onClick={() => removeTodo(todo._id)}>
              <Delete />
            </IconButton>
          </>
        )}
      </Box>
    </ListItem>
  );
};