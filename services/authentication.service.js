const bcrypt = require('bcrypt');
const accountService = require('./account.service');

const login = async (username, password) => {
  const account = await accountService.getAccountByUsername(username);
  const flag = await bcrypt.compare(password, account.password);
  if (flag) {
    return account;
  } else {
    return null;
  }
};

const register = async (username, password) => {
  const newAccount = await accountService.createAccount(username, password);
  if (!newAccount) {
    // this means new account created
    return null;
  }
}

module.exports = {
  login,
};