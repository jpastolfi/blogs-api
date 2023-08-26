const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Token not found' });
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    /* Caso esteja tudo certo, nós então usamos o serviço de usuário para obter seus dados atualizados */

    /* const user = await UserService.getByUserId(decoded.data.userId); */

    /* Não existe um usuário na nossa base com o id informado no token. */
    /* if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    } */

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    /* req.user = user; */

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  /* console.log('token');
  next(); */
};

module.exports = { 
  validateJWT,
};