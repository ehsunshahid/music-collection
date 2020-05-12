const accountService = require('../services/account.service');

const authenticateAccount = (req, res, next) => {
  
  next();
  
}

module.exports = {
  authenticateAccount,
};