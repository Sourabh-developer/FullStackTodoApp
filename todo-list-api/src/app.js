const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');

// Route files
const todos = require('./routes/todo.routes');

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Explicitly include PATCH
    allowedHeaders: ['Content-Type']
  }));

// Mount routers
app.use('/api/v1/todos', todos);

// Error handler middleware
app.use(errorHandler);

module.exports = app;