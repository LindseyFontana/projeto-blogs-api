require('express-async-errors');
const express = require('express');
var httpContext = require('express-http-context');
const errorMiddleware = require('./middleware/error');
const loginController = require('./controllers/loginController');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const postRouter = require('./routers/postRouter');
const validateToken = require('./middleware/token');

const app = express();

app.use(express.json());

app.use(httpContext.middleware);

app.post('/login', loginController.authenticate);

app.use('/user', userRouter);

app.use('/categories', validateToken, categoryRouter);

app.use('/post', validateToken, postRouter);

app.use(errorMiddleware);

module.exports = app;
