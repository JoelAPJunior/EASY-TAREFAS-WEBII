PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  criado_em TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS projeto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data_inicio TEXT,
  data_fim TEXT,
  id_usuario_dono INTEGER NOT NULL,
  criado_em TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (id_usuario_dono) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tarefa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT,
  prioridade TEXT CHECK(prioridade IN ('baixa','media','alta')) DEFAULT 'media',
  status TEXT CHECK(status IN ('pendente','em_andamento','concluida')) DEFAULT 'pendente',
  prazo TEXT,
  id_projeto INTEGER NOT NULL,
  criado_em TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (id_projeto) REFERENCES projeto(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comentario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  data TEXT DEFAULT (datetime('now')),
  id_tarefa INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  FOREIGN KEY (id_tarefa) REFERENCES tarefa(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS usuario_projeto (
  id_usuario INTEGER NOT NULL,
  id_projeto INTEGER NOT NULL,
  role TEXT DEFAULT 'colaborador',
  PRIMARY KEY (id_usuario,id_projeto),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (id_projeto) REFERENCES projeto(id) ON DELETE CASCADE
);
