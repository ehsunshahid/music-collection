const db = require('../db');

const getAllPlaylists = async () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM playlists`, (err, playlists) => {
      if (err) {
        reject(err); 
      } else {
        resolve(playlists);
      }
    });
  });
};

const getPlaylistById = async (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM playlists WHERE id=${id}`, (err, playlist) => {
      if (err) {
        reject(err);
      } else {
        resolve(playlist);
      }
    })
  })
};

const getPlaylistByTitle = async (title) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM playlists WHERE title="${title}"`, (err, playlist) => {
      if (err) {
        reject(err);
      } else {
        resolve(playlist);
      }
    })
  })
};

const createPlaylist = async (title, accountId, isPublic) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO playlists (title, account_id, is_public) VALUES('${title}', '${accountId}', '${isPublic}')`, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  })
};

const deletePlaylist = async (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM playlists WHERE id='${id}'`, (err) => {
      if (err) {
        reject(err);
      }
        resolve();
      
    })
  })
};

const updatePlaylist = async (id, title = null) => {
  return new Promise((resolve, reject) => {
    let updateStatement = 'UPDATE playlists SET ';
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

const getPlaylistsByAccountId = async (accountId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * from playlists WHERE account_id = ${accountId}`, (err, playlists) => {
      if (err) {
        reject(err);
      }
      resolve(playlists);
    })
  })
} 

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  getPlaylistByTitle,
  updatePlaylist,
  deletePlaylist,
  createPlaylist,
  getPlaylistsByAccountId,
}