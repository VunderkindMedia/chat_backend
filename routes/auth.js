const express = require('express');
const {
  auth, signOut
} = require('../controllers');

const authRouter = express.Router();

authRouter.post('/', auth);
authRouter.post('/signout', signOut);

module.exports = authRouter;
