const express = require('express');
const Joi = require('joi');

const router = express.Router();

const db = require('./../db/connection');
const chats = db.get('chats');
const users = db.get('users');
const chatSchema = Joi.object().keys({
  title: Joi.string().trim().max(30).required(),
});
const messageSchema = Joi.object().keys({
  message: Joi.string().trim().required(),
});

function chatNotFound(res, next) {
  res.status(404);
  next(new Error('Conversa não encontrada.'));
}

router.get('/', (req, res, next) => {
  chats.find({}, (err, data) => {
    res.json(data);
  })
});

router.post('/create', (req, res, next) => {
  const result = chatSchema.validate(req.body);
  if(result.error) {
    res.status(422);
    next(new Error('Informe um título com no máximo 30 caracteres.'));
  } else {
    chats.insert({
      title: req.body.title,
      messages: [],
    }).then(inserted => {
      res.json(inserted);
    });
  }
});

router.get('/:chat_id', (req, res, next) => {
  chats.findOne({
    _id: req.params.chat_id,
  }).then(chat => {
    if(chat) {
      res.json({
        _id: chat._id,
        messages: chat.messages,
      });
    } else {
      chatNotFound(res, next);
    }
  });
});

router.post('/:chat_id', (req, res, next) => {
  const result = messageSchema.validate(req.body);
  if(result.error) {
    res.status(422);
    next(new Error('Mensagem não pode ser vazia.'));
  } else {
    chats.findOne({
      _id: req.params.chat_id,
    }).then(chat => {
      if(!chat) {
        chatNotFound(res, next);
      } else {
        const message = {
          user_id: req.user._id,
          time: Date.now(),
          text: req.body.message,
        };
        chats.update({ _id: chat._id }, 
        {
          $push: { 
            messages: message,
          }
        });
        res.json(message);
      }
    });
  }
});

router.get('/subscribe/:chat_id', (req, res, next) => {
  chats.findOne({
    _id: req.params.chat_id,
  }).then(chat => {
    if(!chat) {
      chatNotFound(res, next);
    } else {
      users.update({ _id: req.user._id }, 
        {
          $push: { 
            chats: chat._id,
          }
        });
      res.json({
        message: "Usuário inscrito."
      });
    }
  });
});

module.exports = router;
