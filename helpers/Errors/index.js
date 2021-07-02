class CustomError extends Error {
  constructor(data, statusCode, ...args) {
    super(args);
    this.message = data.message;
    this.status = statusCode;
  }
}

module.exports = {
  CustomError,
};