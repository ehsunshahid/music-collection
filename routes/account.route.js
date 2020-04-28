const express = require("express");
const router = express.Router();
const accountsController = require('../controllers/account.controller');

router.get('/', accountsController.getAllAccounts);
router.get('/:id', accountsController.getAccountById);
router.post('/', accountsController.createAccount);
router.put('/:id', accountsController.updateAccount);
router.delete('/:id', accountsController.deleteAccount);
router.get('/:id/playlists', accountsController.getPlaylistsByAccountId);

module.exports = router;