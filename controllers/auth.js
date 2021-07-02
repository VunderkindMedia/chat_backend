const {isEmpty} = require('../helpers/instruments');
const { Users } = require('../models');
const {MESSAGES, CONFIG } = require('../constants');

const auth = async (req, res, next) => {
  const body = req.body;
  if (req.session.user) {
    res.send({ data: `${req.session.user.nickname}, Вы уже авторизован!`, auth: true })
  } else if (!isEmpty(body) && body.phoneNumber && body.password) {
    console.log(body.phoneNumber);
     Users.findOne({'phoneNumber': body.phoneNumber}).select('+password').select('+salt')
    .then((user)=> {
       if (user) {
           Users.hashPassword(body.password, CONFIG.STATIC_SALT, user.salt).then((hashPassword)=> {
             if (user.password === hashPassword) {
               if (!req.session.key) req.session.key = req.sessionID
               req.session.user = user
               res.send({ data: 'Успешно авторизовался!', auth: true })
             } else {
               res.status(401).send({ error: 'Неверный пароль' })
             }
           })
       } else {
         res.status(401).send({ error: 'Пользователь не найден' })
       }
    })
    .catch((err) => res.send({ error: err.message }))
    .catch(next);
  } else {
    res.status(401).send({ error: 'Введите данные' })
  }

}

const signOut = (req, res) => {

  console.log("user.signout()");
  req.session.destroy();
  res.send('Вы успешно вышли из аккаунта!');
};

module.exports = {
  auth, signOut
};
