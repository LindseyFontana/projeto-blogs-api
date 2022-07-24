const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middleware/error');
const loginController = require('./controllers/loginController');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const postRouter = require('./routers/postRouter');
const validateToken = require('./middleware/token');

const app = express();

app.use(express.json());

app.post('/login', loginController.validate);

app.use('/user', userRouter);

app.use('/categories', validateToken, categoryRouter);

app.use('/post', validateToken, postRouter);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
