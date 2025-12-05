// db.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'taskflow.db');
const INIT_SQL = path.join(__dirname, 'migrations', '001_init.sql');
const SEED_SQL = path.join(__dirname, 'seed', 'seed.sql');

function runInit() {
  if (!fs.existsSync(INIT_SQL)) {
    console.error('Arquivo de migração não encontrado:', INIT_SQL);
    process.exit(1);
  }
  const db = new sqlite3.Database(DB_FILE);
  const sql = fs.readFileSync(INIT_SQL, 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabelas:', err);
    } else {
      console.log('Tabelas criadas com sucesso em', DB_FILE);
      // opcional: seed
      if (fs.existsSync(SEED_SQL)) {
        const seed = fs.readFileSync(SEED_SQL, 'utf8');
        db.exec(seed, (e) => {
          if (e) console.error('Erro seed:', e);
          else console.log('Dados seed inseridos.');
          db.close();
        });
      } else db.close();
    }
  });
}

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--init') runInit();
  else console.log('Use node db.js --init para criar o banco.');
}

module.exports = function openDb() {
  return new sqlite3.Database(DB_FILE);
};
