const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Carregar variáveis de ambiente
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Porta configurável através de variáveis de ambiente

app.use(bodyParser.json());
app.use('/api/v1', routes); // Usa o arquivo de rotas para definir os endpoints

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
