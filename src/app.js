const express = require('express');

const { validateCredentials } = require('./controllers/user.controller');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');

const app = express();

// não remova ou mova esse endpoint!
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateEmail, validatePassword, validateCredentials);
app.post('/user');
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
