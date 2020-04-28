const playlistService = require('../services/playlist.service');
const songService = require('../services/song.service');

const getAllPlaylists = async (req, res) => {
  const playlists = await playlistService.getAllPlaylists();
  res.status(200).send({ playlists });
};

const getPlaylistById = async (req, res) => {
  const id = req.params.id;
  const playlist = await playlistService.getPlaylistById(id);
  res.status(200).send({ playlist });
}

const createPlaylist = async (req, res) => {
  const requestBody = req.body;
  const playlist = await playlistService.createPlaylist(requestBody.title, requestBody.accountId, requestBody.isPublic);
  res.status(200).send({ playlist });
}

const deletePlaylist = async (req, res) => {
  const id = req.params.id;
  const playlist = await playlistService.deletePlaylist(id);
  res.status(200).send({ playlist });
}

const updatePlaylist = async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title ? req.body.title : null;

  const playlist = await playlistService.updatePlaylist(id, newTitle);
  res.status(200).send({ playlist });
};

const getSongsByPlaylistId = async (req, res) => {
  const id = req.params.id;
  const songs = await songService.getSongsByPlaylistId(id);
  res.status(200).send({ songs });
}

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  createPlaylist,
  getSongsByPlaylistId,
}