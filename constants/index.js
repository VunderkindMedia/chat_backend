const MESSAGES = {
  incorrectPassword: 'Пароль не соответствует формату',
  incorrectPhone: 'Номер телефона не соответствует формату',
  incorrectEmail: 'Email не соответствует формату',
  incorrectText: 'Введите корректный текст',
  INCORRECT_USER_DATA: 'Неправильные данные пользователя',
}

const ERROR_CODE = {
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const CONFIG = {
  STATIC_SALT: 'crazy_family'
}

module.exports = {
  MESSAGES,
  ERROR_CODE,
  CONFIG
}
