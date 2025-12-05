// models/queries.js
const openDb = require('../db');

function all(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function get(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function run(query, params = []) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      const lastID = this ? this.lastID : null;
      db.close();
      if (err) reject(err);
      else resolve({ lastID, changes: this ? this.changes : 0 });
    });
  });
}

module.exports = { all, get, run };
