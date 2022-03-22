const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Backend API',
    documentation: 'https://github.com/l-pires/chat-web'
  });
});

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found: ${req.originalUrl}.`));
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
