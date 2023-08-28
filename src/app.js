const express = require('express');

const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/Category.controller');
const postController = require('./controllers/Post.controller');
const { validateJWT } = require('./middlewares/auth');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const { validateName } = require('./middlewares/validateName');
const { validateId } = require('./middlewares/validateId');
const { validateNameCategory } = require('./middlewares/validateNameCategory');
const { postCreationValidation } = require('./middlewares/postCreationValidation');

const app = express();

// não remova ou mova esse endpoint!
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateEmail, validatePassword, userController.login);
app.post('/user', validateName, validateEmail, validatePassword, userController.insert);

app.use(validateJWT);

app.get('/user', userController.findAll);
app.get('/user/:id', validateId, userController.findById);

app.post('/categories', validateNameCategory, categoryController.insert);
app.get('/categories', categoryController.findAll);

app.post('/post', postCreationValidation, postController.insert);
app.get('/post', postController.findAll);
app.get('/post/:id', postController.findById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
