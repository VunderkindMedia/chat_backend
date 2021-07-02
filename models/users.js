const {MESSAGES} = require('../constants');
const crypto = require('crypto');
const util = require('util');
const mongoose = require('mongoose');
const {ExDate} = require('../helpers/instruments');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { validateText, validateEmail, validatePhone, validatePassword } = require('../helpers/validators');

const minPasswordLength = 8;
const maxPasswordLength = 30;

const randomBytesAsync = util.promisify(crypto.randomBytes);

const UsersSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'поле не заполнено!'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (nickname) => validateText(nickname),
      message: MESSAGES.incorrectText,
    },
  },
  email: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 30,
    validate: {
      validator: (email) => validateEmail(email),
      message: MESSAGES.incorrectEmail,
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'поле не заполнено!'],
    unique: true,
    minlength: 11,
    maxlength: 30,
    validate: {
      validator: (phoneNumber) => validatePhone(phoneNumber),
      message: MESSAGES.incorrectPhone,
    },
  },
  password: {
    type: String,
    required: [true, 'поле не заполнено!'],
    minlength: minPasswordLength,
    maxlength: maxPasswordLength,
    select: false
    // validate: {
    //   validator: (password) => validatePassword(password, minPasswordLength, maxPasswordLength),
    //   message: MESSAGES.incorrectPassword,
    // },
  },
  rules: {
    type: Boolean,
    required: [true, 'поле не заполнено!'],
  },
  role: {
    type: String,
    required: [true, 'поле не заполнено!'],
    minlength: 5,
    maxlength: 30,
    validate: {
      validator: (role) => validateText(role),
      message: MESSAGES.incorrectText,
    },
  },
  reputation: {
    type: Number,
    required: false,
    default: 0
  },
  isBlocked: {
    type: Boolean,
    required: false,
    default: false,
  },
  salt: {
    type: String,
    required: false,
    select: false
  },
  data_create: {
    type: Date,
    required: false,
    default: new ExDate()
  },
  data_update: {
    type: Date,
    required: false,
    default: null
  }
});

UsersSchema.plugin(AutoIncrement, {id: 'users', inc_field: 'id'});

UsersSchema.statics.randomStringAsync = async function (length = 30) {
  let salt = await randomBytesAsync(length);
  return salt.toString('hex');
}

UsersSchema.statics.hashPassword = async function (password, static_salt, dynamic_salt) {
  console.log(dynamic_salt);
  const salt = crypto.pbkdf2Sync(dynamic_salt, static_salt, 10, 30, 'sha512').toString('hex');
  return crypto.pbkdf2Sync(password.toString(), salt, 10, maxPasswordLength/2, 'sha512').toString('hex');
};

module.exports = mongoose.model('Users', UsersSchema);
