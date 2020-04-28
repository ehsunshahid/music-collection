const sqlite3 = require('sqlite3').verbose();
const dummyData = require('./dummydata');
const db = new sqlite3.Database('../database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
    // CREATING TABLES
    try {
      console.log('creating tables');
      // Accounts
      db.run("CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY AUTOINCREMENT, username STRING, password STRING)");
      // Playlists
      db.run("CREATE TABLE IF NOT EXISTS playlists(id INTEGER PRIMARY KEY, title STRING, is_public BOOLEAN, account_id INTEGER, CONSTRAINT fk_accounts FOREIGN KEY (account_id) REFERENCES accounts(id))");
      // Songs
      db.run("CREATE TABLE IF NOT EXISTS songs(id INTEGER PRIMARY KEY, title STRING, playlist_id INTEGER, CONSTRAINT fk_playlist FOREIGN KEY (playlist_id) REFERENCES playlists(id))");

      // console.log('dummyData: ', dummyData);

      // // Adding accounts
      // dummyData.accounts.forEach(account => {
      //   db.run(`INSERT INTO accounts VALUES('${account.id}', '${account.username}', '${account.password}')`, (err) => {
      //     if(err) {
      //       console.log('err: ', err);
      //     } else {
      //       console.log('account inserted successfully!');
      //     }
          
      //   })
      // });

      // // Adding playlists
      // dummyData.playlists.forEach(playlist => {
      //   db.run(`INSERT INTO playlists VALUES('${playlist.id}', "${playlist.title}", '${playlist.isPublic}', '${playlist.accountId}')`, (err) => {
      //     if(err) {
      //       console.log('err: ', err);
      //     } else {
      //       console.log('playlist inserted successfully!');
      //     }
          
      //   })
      // });

      // // Adding songs
      // dummyData.songs.forEach(song => {
      //   db.run(`INSERT INTO songs VALUES('${song.id}', '${song.playlistId}', "${song.title}")`, (err) => {
      //     if(err) {
      //       console.log('err: ', err);
      //     } else {
      //       console.log('song inserted successfully!');
      //     }
          
      //   })
      // });
    } catch (err) {
      console.log("err: ", err);
    }
    
});

// db.close((err) => {
//   if (err) {
//     console.log('Error Closing DB');
//     console.log(err);
//   } else {
//     console.log('DB closed successfully!');
//   }
// })

module.exports = db;