
const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'API funcionando corretamente!',
  });
});

app.use('/v1', userRoutes);

module.exports = app;
