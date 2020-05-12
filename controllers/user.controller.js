const authenticationService = require('../services/authentication.service');
const accountService = require('../services/account.service');

const register = async (req, res) => {
  const requestBody = req.body;
  
  if (!requestBody.username || !requestBody.password) {
    return res.status(400);
  }

  const accountError = await accountService.createAccount(requestBody.username, requestBody.password);
  if (!accountError) {
    return res.status(204).send();
  }
  res.status(500).json({ err: accountError });
}

const login = async (req, res) => {
  const requestBody = req.body;
  const account = await authenticationService.login(requestBody.username, requestBody.password);
  
  if (account) {
    req.session.accountId = account.id;
    return res.status(200).send({ login: "success" });
  } else {
    return res.status(401).send({ login: "failed", error: "invalid_grant" });
  }
}

module.exports = {
  register,
  login,
}