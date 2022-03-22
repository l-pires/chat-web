const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const db = require('./../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().trim().min(2).required(),
  password: Joi.string().trim().min(8).required(),
});

function loginError(res, next) {
  res.status(422);
  next(new Error('Não foi possível efetuar o login.'));
}

function sendToken(user, res, next) {
  jwt.sign({
    _id: user._id,
    username: user.username,
  }, process.env.TOKEN_SECRET, {
    expiresIn: '1d',
  }, (err, token) => {
    if(err) {
      loginError(res, next);
    } else {
      res.json({ token });
    }
  });
}

router.post('/signup', (req, res, next) => {
  const result = schema.validate(req.body);
  if(result.error) {
    res.status(422);
    next(result.error);
  } else {
    users.findOne({
      username: req.body.username
    }).then(user => {
      if(user) {
        res.status(409);
        const error = new Error(`O nome de usuário ${req.body.username} não está disponível.`);
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then(hashedPassword => {
          users.insert({
            username: req.body.username,
            password: hashedPassword,
          }).then(inserted => {
            sendToken(inserted, res, next);
          });
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  users.findOne({
    username: req.body.username
  }).then(user => {
    if(user) {
      bcrypt.compare(req.body.password, user.password)
        .then(result => {
          if(result) {
            sendToken(user, res, next);
          } else {
            loginError(res, next);
          }
        });
    } else {
      loginError(res, next);
    }
  });
});

module.exports = router;
