const {MESSAGES, CONFIG } = require('../constants');
const {validatePassword} = require('../helpers/validators');
const { Users } = require('../models');
const { isEmpty } = require('../helpers/instruments')

const usersCreate = async (req, res, next) => {

  const body = req.query;

  let user = await Users.findOne({'phoneNumber': body.phoneNumber});
  if (!user) {
      const dynamic_salt = await Users.randomStringAsync();

      if (!validatePassword(body.password, 8, 30)) {
        return res.send({ error: MESSAGES.incorrectPassword });
      }

      body.password = body.password && await Users.hashPassword(body.password, CONFIG.STATIC_SALT, dynamic_salt);
      body.salt = dynamic_salt;

      Users.create(body)
      .then((user) => res.send({ data: user }))
      .catch((err) => res.send({ error: err.message }))
      .catch(next);
    } else {
      res.send({ error: 'Пользователь с таким номером телефона уже зарегистрирован'})
    }
};

const usersGet = async (req, res, next) => {
  console.log(req.session.user);
  const body = req.query;
  if (!isEmpty(body)) {
    Users.findOne(body)
    .then((user)=> res.send({ data: user }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  } else {
    Users.find()
    .then((users)=> res.send({ data: users }))
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  }

}

const usersDel = async (req, res, next) => {
  Users.remove({
    id: { $in: req.query.ids.split(',')}
  })
  .then((user)=> res.send({ data: user }))
  .catch((err) => res.send({ error: err.message }))
  .catch(next);
}

module.exports = {
  usersCreate, usersGet, usersDel
};
