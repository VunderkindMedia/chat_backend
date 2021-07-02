const express = require('express');
const {
  usersCreate, usersGet, usersDel, usersDelAll
} = require('../controllers');

const userRouter = express.Router();

userRouter.get('/add', usersCreate);
userRouter.get('/get', usersGet);
userRouter.get('/delete', usersDel);



module.exports = userRouter;
