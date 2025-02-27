const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const taskRouter = require('./routes/task.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const teamRouter = require('./routes/team.route');
const compression = require('compression');
const xssClean = require('xss-clean');
const helmet = require('helmet');
const verifyToken = require("./middlewares/verifyToken");

// Enable CORS
app.use(cors());

// Use helmet for securing HTTP headers
app.use(helmet());

// Use compression for response body compression
app.use(compression());

// Use xss-clean to prevent XSS attacks
app.use(xssClean());

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

//auth routes
app.use('/api/v1/auth', authRouter);

// Routes
app.use('/api/v1/tasks',verifyToken, taskRouter);
app.use('/api/v1/users',verifyToken, userRouter);
app.use('/api/v1/teams',verifyToken, teamRouter);


// Global Middleware for not found routes
app.all('*', (req, res, next) => {
    next(AppError.create(`This route ${req.originalUrl} is not available on this server!`, 404));
});

// Global Error Middleware
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Something went wrong!',
    });
});

module.exports = app;