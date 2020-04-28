const db = require('../db');

const getAllSongs = async () => {
  return new Promise((resolve, reject) => {
    db.songs(`SELECT * FROM songs`, (err, songs) => {
      if (err) {
        reject(err); 
      } else {
        resolve(songs);
      }
    });
  });
};

const getSongById = async (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM songs WHERE id=${id}`, (err, song) => {
      if (err) {
        reject(err);
      }
      resolve(song);
    })
  })
};

const getSongByTitle = async (title) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM songs WHERE title="${title}"`, (err, song) => {
      if (err) {
        reject(err);
      }
      resolve(song);
    })
  })
};

const createSong = async (title, playlistId) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO songs (title, playlist_id) VALUES('${title}', '${playlistId}')`, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  })
};

const deleteSong = async (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM songs WHERE id='${id}'`, (err) => {
      if (err) {
        reject(err);
      }
        resolve();
      
    })
  })
};

const updateSong = async (id, title = null) => {
  return new Promise((resolve, reject) => {
    let updateStatement = 'UPDATE songs SET ';
    if (title) {
      updateStatement += `title='${title}'`
    }
    
    updateStatement += ` WHERE id='${id}'`;
    db.run(updateStatement, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  })
}

const getSongsByPlaylistId = async (playlistId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * from songs WHERE account_id = ${playlistId}`, (err, songs) => {
      if (err) {
        reject(err);
      }
      resolve(songs);
    })
  })
}

module.exports = {
  getAllSongs,
  getSongById,
  getSongByTitle,
  updateSong,
  deleteSong,
  createSong,
  getSongsByPlaylistId,
}