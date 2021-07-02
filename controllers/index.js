const {
  usersCreate, usersGet, usersDel
} = require('./users');
const {
  auth, signOut
} = require('./auth');

module.exports = {
  usersCreate, usersGet, usersDel,
  auth, signOut
}
