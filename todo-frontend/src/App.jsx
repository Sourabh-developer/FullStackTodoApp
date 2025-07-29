import { TodoProvider } from './contexts/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Container, Typography, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TodoProvider>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Todo List
          </Typography>
        </Box>
        <TodoForm />
        <TodoList />
      </Container>
      <ToastContainer position="bottom-right" />
    </TodoProvider>
  );
}

export default App;