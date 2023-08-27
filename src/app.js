const express = require('express');

const { validateJWT } = require('./middlewares/auth');
const { validateCredentials, insert, findAll, findById } = require('./controllers/user.controller');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const { validateName } = require('./middlewares/validateName');
const { validateId } = require('./middlewares/validateId');

const app = express();

// não remova ou mova esse endpoint!
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateEmail, validatePassword, validateCredentials);
app.post('/user', validateName, validateEmail, validatePassword, insert);

app.use(validateJWT);

app.get('/user', findAll);
app.get('/user/:id', validateId, findById);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
