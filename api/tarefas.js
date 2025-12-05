import fs from "fs-extra";
import path from "path";

const dbPath = path.resolve("data/tarefas.json");

// Lê tarefas
export async function listarTarefas() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

// Adiciona tarefa
export async function criarTarefa(tarefa) {
  const lista = await listarTarefas();
  tarefa.id = Date.now();
  lista.push(tarefa);
  await fs.writeFile(dbPath, JSON.stringify(lista, null, 2));
  return tarefa;
}

// Deletar tarefa
export async function deletarTarefa(id) {
  let lista = await listarTarefas();
  lista = lista.filter(t => t.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(lista, null, 2));
  return true;
}
