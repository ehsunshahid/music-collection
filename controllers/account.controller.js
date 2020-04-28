const accountsService = require('../services/account.service');
const playlistService = require('../services/playlist.service');

const getAllAccounts = async (req, res) => {
  const accounts = await accountsService.getAllAccounts();
  res.status(200).send({ accounts });
};

const getAccountById = async (req, res) => {
  const id = req.params.id;
  const account = await accountsService.getAccountById(id);
  res.status(200).send({ account });
}

const createAccount = async (req, res) => {
  const requestBody = req.body;
  const account = await accountsService.createAccount(requestBody.username, requestBody.password);
  res.status(200).send({ account });
}

const deleteAccount = async (req, res) => {
  const id = req.params.id;
  const account = await accountsService.deleteAccount(id);
  res.status(200).send({ account });
}

const updateAccount = async (req, res) => {
  const id = req.params.id;
  const newUsername = req.body.username ? req.body.username : null;
  const newPassword = req.body.password ? req.body.password : null;

  const account = await accountsService.updateAccount(id, newUsername, newPassword);
  res.status(200).send({ account });
}

const getPlaylistsByAccountId = async (req, res) => {
  const id = req.params.id;
  const playlists = await playlistService.getPlaylistsByAccountId(id);
  res.status(200).send({ playlists });
}

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  deleteAccount,
  updateAccount,
  getPlaylistsByAccountId,
};