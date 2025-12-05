INSERT OR IGNORE INTO usuario (nome,email,senha) VALUES
('João','joao@example.com','senha123'),
('Maria','maria@example.com','senha123');

INSERT OR IGNORE INTO projeto (titulo, descricao, data_inicio, data_fim, id_usuario_dono) VALUES
('Projeto Exemplo','Projeto exemplo para demonstração','2025-01-01','2025-12-31',1);

INSERT OR IGNORE INTO usuario_projeto (id_usuario,id_projeto,role) VALUES
(1,1,'dono'), (2,1,'colaborador');

INSERT OR IGNORE INTO tarefa (titulo, descricao, prioridade, status, prazo, id_projeto) VALUES
('Tarefa 1','Descrição da tarefa 1','alta','pendente','2025-07-01',1),
('Tarefa 2','Descrição da tarefa 2','media','em_andamento','2025-08-10',1);

INSERT OR IGNORE INTO comentario (texto, id_tarefa, id_usuario) VALUES
('Comentário exemplo do João', 1, 1);
