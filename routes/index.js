const express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next)=> {
  let user = req.session.user;

  if (user) {
    delete user.salt;
    delete user.password;
    res.send({data: {
        user: user
      }})
  } else {
    res.send({welcome: 'Это стартовая страница'})
  }

});

module.exports = {
  indexRouter, usersRouter, authRouter
};
