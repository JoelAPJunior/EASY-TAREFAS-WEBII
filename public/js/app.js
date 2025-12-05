async function carregar() {
  const res = await fetch("/api/tarefas");
  const tarefas = await res.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(t => {
    lista.innerHTML += `
      <li>
        ${t.titulo}
        <button onclick="remover(${t.id})">X</button>
      </li>
    `;
  });
}

async function addTarefa() {
  const titulo = document.getElementById("titulo").value;

  await fetch("/api/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo })
  });

  carregar();
}

async function remover(id) {
  await fetch("/api/tarefas/" + id, { method: "DELETE" });
  carregar();
}

carregar();
