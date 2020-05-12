const bcrypt = require('bcrypt');
const db = require('../db');

const getAllAccounts = async () => {
  return new Promise((resolve, reject) => {
    const accounts = [];
    db.all(`SELECT * FROM accounts`, (err, accounts) => {
      if (err) {
        reject(err); 
      } else {
        resolve(accounts);
      }
    });
  });
};

const getAccountById = async (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM accounts WHERE id=${id}`, (err, account) => {
      if (err) {
        reject(err);
      } else {
        resolve(account);
      }
    })
  })
};

const getAccountByUsername = async (username) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM accounts WHERE username="${username}"`, (err, account) => {
      if (err) {
        reject(err);
      } else {
        resolve(account);
      }
    })
  })
};

const createAccount = async (username, password) => {
  return await new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.run(`INSERT INTO accounts (username, password) VALUES('${username}', '${hashedPassword}')`, (err) => {
      if (err) {
        reject(err);
      }
      resolve(null);
    })
  })
};

const deleteAccount = async (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM accounts WHERE id='${id}'`, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  })
};

const updateAccount = async (id, username = null, password = null) => {
  return new Promise((resolve, reject) => {
    let updateStatement = 'UPDATE accounts SET ';
    if (username) {
      updateStatement += `username='${username}'`
    }
    if (username && password) {
      updateStatement += ', ';
    }
    if (password) {
      updateStatement += `password='${password}'`
    }
    updateStatement += ` WHERE id='${id}'`;
    console.log('updateStatement: ', updateStatement);
    db.run(updateStatement, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    })
  })
}

module.exports = {
  getAllAccounts,
  getAccountById,
  getAccountByUsername,
  createAccount,
  deleteAccount,
  updateAccount,
};