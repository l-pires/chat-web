const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');

const user = require('./user');
const middlewares = require('./user/middlewares');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(volleyball);
app.use(middlewares.checkToken);

app.get('/', (req, res) => {
  res.json({
    message: 'Backend API',
    documentation: 'https://github.com/l-pires/chat-web'
  });
});

app.use('/user', user);

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Não encontrado: ${req.originalUrl}.`));
});

app.use((err, req, res, next) => {
  if(!res.statusCode || res.statusCode < 400)
    res.status(500);
  res.json({
    message: err.message,
  });
});

const port = 5050;
app.listen(port, () => {
  console.log(`>>> http://localhost:${port}/`);
});
