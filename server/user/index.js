const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const db = require('./../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().trim().min(2).required(),
  password: Joi.string().trim().min(8).required(),
});

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
            res.json({
              _id: inserted._id,
              username: inserted.username,
            });
          });
        });
      }
    });
  }
});

module.exports = router;
