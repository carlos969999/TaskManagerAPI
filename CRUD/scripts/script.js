const tasksEndpoint = "http://localhost:8080/task/user";

// Função para esconder o carregador
function hideLoader() {
  document.getElementById("loading").style.display = "none";
}

// Função para mostrar as tarefas
function show(tasks) {
  let tab = `<thead>
            <th scope="col">#</th>
            <th scope="col">Descrições</th>
            <th scope="col">Ações</th>
        </thead>`;

  for (let task of tasks) {
    tab += `
            <tr>
                <td scope="row">${task.id}</td>
                <td>${task.description}</td>
                <td>
                    <button onclick="alterar(${task.id}, '${task.description}')">Alterar</button>
                    <button onclick="excluir(${task.id})" class="botao-excluir">Excluir</button>
                </td>
            </tr>
        `;
  }

  document.getElementById("tasks").innerHTML = tab;
}

// Função para obter as tarefas
async function getTasks() {
  let key = "Authorization";
  const response = await fetch(tasksEndpoint, {
    method: "GET",
    headers: new Headers({
      Authorization: localStorage.getItem(key),
    }),
  });

  var data = await response.json();
  if (response) hideLoader();
  show(data);
}

// Função para alterar uma tarefa
function alterar(id, description) {
  const alterarDiv = document.getElementById("alterarDiv");
  alterarDiv.style.display = "block";

  document.getElementById("novaDescricao").value = description;

  // Guardar o ID da tarefa para usar ao salvar
  alterarDiv.setAttribute("data-task-id", id);
}

// Função para salvar a alteração
async function salvarAlteracao() {
  const alterarDiv = document.getElementById("alterarDiv");
  const id = alterarDiv.getAttribute("data-task-id");
  const novaDescricao = document.getElementById("novaDescricao").value;

  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ description: novaDescricao }),
    });

    if (response.ok) {
      alert("Tarefa alterada com sucesso");
      alterarDiv.style.display = "none"; 
      getTasks(); 
    } else {
      const errorMessage = await response.text();
      console.error(`Erro ao alterar a tarefa: ${errorMessage}`);
      alert("Erro ao alterar a tarefa. Verifique o console para mais detalhes.");
    }
  } catch (error) {
    console.error(`Erro na requisição: ${error.message}`);
    alert("Não foi possível alterar a tarefa. Verifique o console para mais detalhes.");
  }
}

// Função para cancelar a alteração
function cancelarAlteracao() {
  document.getElementById("alterarDiv").style.display = "none";
}

// Função para exibir o formulário de adição
function exibirAdicionarDiv() {
  document.getElementById("adicionarDiv").style.display = "block";
}

// Função para salvar uma nova tarefa
async function salvarNovaTarefa() {
  const descricaoTarefa = document.getElementById("descricaoTarefa").value;

  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({ description: descricaoTarefa }),
    });

    if (response.ok) {
      alert("Tarefa adicionada com sucesso");
      document.getElementById("adicionarDiv").style.display = "none"; 
      getTasks(); 
    } else {
      const errorMessage = await response.text();
      console.error(`Erro ao adicionar a tarefa: ${errorMessage}`);
      alert("Erro ao adicionar a tarefa. Verifique o console para mais detalhes.");
    }
  } catch (error) {
    console.error(`Erro na requisição: ${error.message}`);
    alert("Não foi possível adicionar a tarefa. Verifique o console para mais detalhes.");
  }
}

// Função para cancelar a adição
function cancelarAdicao() {
  document.getElementById("adicionarDiv").style.display = "none";
}

// Função para excluir uma tarefa
async function excluir(id) {
  let key = "Authorization";
  if (confirm("Você deseja realmente excluir?")) {
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem(key),
        },
        method: "DELETE",
      });

      if (response.ok) {
        alert("Tarefa excluída com sucesso");
        getTasks(); // Recarrega a lista de tarefas após a exclusão
      } else {
        throw new Error("Erro ao excluir a tarefa");
      }
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir a tarefa");
    }
  }
}

// Carrega as tarefas ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("Authorization")) {
    window.location = "/Repository/todosimple/CRUD/login.html";
  }
  getTasks();
});
