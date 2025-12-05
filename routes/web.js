// routes/web.js
const express = require('express');
const router = express.Router();
const db = require('../models/queries');

router.get('/', async (req, res) => {
  // exibir 5 projetos recentes
  const projetos = await db.all('SELECT p.id, p.titulo, p.descricao, u.nome as dono FROM projeto p JOIN usuario u ON p.id_usuario_dono = u.id ORDER BY p.criado_em DESC LIMIT 5');
  res.render('index', { title: 'TaskFlow - Início', projetos });
});

router.get('/sobre', (req, res) => {
  const descricao = `TaskFlow é uma aplicação web simples para gerenciamento de tarefas e colaboração.
  Permite criar projetos, adicionar tarefas, convidar colaboradores e comentar nas tarefas.`;
  res.render('sobre', { title: 'Sobre o TaskFlow', descricao });
});

module.exports = router;
