const bcrypt = require('bcrypt');
const accountService = require('../services/account.service');

const signUp = async (req, res) => {

}

const login = async (req, res) => {
  const requestBody = req.body;
  const account = await accountService.getAccountByUsername(requestBody.email);
  const flag = await bcrypt.compare(requestBody.password, account.password);
  return res.status(200).send({ flag });
}

module.exports = {
  signUp,
  login,
}