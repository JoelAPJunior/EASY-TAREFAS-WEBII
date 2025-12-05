// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// rotas
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// tratamento simples de erro
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro interno');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando: http://localhost:${PORT}`));
