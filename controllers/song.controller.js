const songService = require('../services/song.service');

const getAllSongs = async (req, res) => {
  const songs = await songService.getAllSongs();
  res.status(200).send({ songs });
};

const getSongById = async (req, res) => {
  const id = req.params.id;
  const song = await songService.getSongById(id);
  res.status(200).send({ song });
}

const createSong = async (req, res) => {
  const requestBody = req.body;
  const song = await songService.createSong(requestBody.title, requestBody.playlistId);
  res.status(200).send({ song });
}

const deleteSong = async (req, res) => {
  const id = req.params.id;
  const song = await songService.deleteSong(id);
  res.status(200).send({ song });
}

const updateSong = async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title ? req.body.title : null;

  const song = await songService.updateSong(id, newTitle);
  res.status(200).send({ song });
}

module.exports = {
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  createSong,
}