const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authorization = req.get('authorization');
  if(authorization) {
    const token = authorization.split(' ')[1];
    if(token) {
      jwt.verify(token, process.env.TOKEN_SECRET, 
        (error, user) => {
          if(error) {
            return next(error);
          }
          req.user = user;
        }
      );
    }
  }
  next();
}

function isLoggedIn(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.status(401);
    next(new Error('Acesso negado.'));
  }
}

module.exports = {
  checkToken, 
  isLoggedIn,
}
