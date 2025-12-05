import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import fs from "fs-extra";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(
  session({
    secret: "easy-secret",
    resave: false,
    saveUninitialized: false
  })
);

// Middleware de proteção
function verificarLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }
  next();
}

// Rotas públicas
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuarios = JSON.parse(await fs.readFile("./data/usuarios.json"));

  const user = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) {
    return res.render("login", { erro: "Email ou senha incorretos" });
  }

  req.session.usuario = { id: user.id, email: user.email };
  res.redirect("/");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Rotas protegidas
app.get("/", verificarLogin, (req, res) => {
  res.render("index", { usuario: req.session.usuario });
});

app.get("/sobre", verificarLogin, (req, res) => {
  res.render("sobre", { usuario: req.session.usuario });
});

// Inicializando API (suas rotas de tarefas permanecem aqui)
import { listarTarefas, criarTarefa, deletarTarefa } from "./api/tarefas.js";

app.get("/api/tarefas", verificarLogin, async (req, res) => {
  const tarefas = await listarTarefas();
  res.json(tarefas);
});
app.post("/api/tarefas", verificarLogin, async (req, res) => {
  const nova = await criarTarefa(req.body);
  res.json(nova);
});
app.delete("/api/tarefas/:id", verificarLogin, async (req, res) => {
  await deletarTarefa(Number(req.params.id));
  res.json({ message: "Tarefa removida!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando http://localhost:3000");
});
