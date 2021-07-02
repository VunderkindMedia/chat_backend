const { CustomError } = require('./Errors');
const { ERROR_CODE } = require('../constants');

const createCustomError = (err, messageBadRequest, statusCode) => {
  throw new CustomError({ message: `${messageBadRequest}: ${err.message}` }, statusCode);
};

const errorHandler = (err, messageNotFound, messageBadRequest) => {
  if (err.name === 'CastError') {
    createCustomError(err, messageNotFound, ERROR_CODE.NOT_FOUND);
  }
  createCustomError(err, messageBadRequest, ERROR_CODE.INCORRECT_DATA);
};

module.exports = {
  errorHandler,
  createCustomError,
};