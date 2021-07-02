const regExpUrl = /https?:\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/;
const regExpEmpty = /^\S/;
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPhone = /^((\+7|7|8)+([(])+([0-9]{3})+([)])+([-])+([0-9]{3})+([-])+([0-9]{2})+([-])+([0-9]{2}))$/;
const regPassword = (minLength, maxLength) => new RegExp(`(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{${minLength},${maxLength}}`);

const validateUrl = (link) => regExpUrl.test(link);
const validateText = (text) => regExpEmpty.test(text);
const validateEmail = (email) => regEmail.test(email);
const validatePhone = (phone) => regPhone.test(phone);
const validatePassword = (password, minLength, maxLength) => regPassword(minLength, maxLength).test(password);

module.exports = {
  validateUrl,
  validateText,
  validateEmail,
  validatePhone,
  validatePassword
};
