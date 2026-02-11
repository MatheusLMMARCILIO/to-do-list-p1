const input = document.querySelector(".inputValueText");
const btnNewAsk = document.querySelector(".newAsk");
const taskBlock = document.querySelector(".activities");

const btnActive = document.querySelector(".active");
const btnCompleted = document.querySelector(".completed");
const btnAll = document.querySelector(".AllTodos");

function getTasks() {
  try {
    const data = JSON.parse(localStorage.getItem("task"));

    if (!data) return [];
    if (!Array.isArray(data)) return [];

    return data;
  } catch (err) {
    return [];
  }
}

let task = getTasks();
let currentFilter = "all"; // all | active | completed

function attLocalS() {
  localStorage.setItem("task", JSON.stringify(task));
}

function clearUI() {
  taskBlock.innerHTML = "";
}

function applyFilter(list) {
  if (currentFilter === "active") {
    return list.filter((item) => item.done === false);
  }

  if (currentFilter === "completed") {
    return list.filter((item) => item.done === true);
  }

  return list;
}

function render() {
  clearUI();

  const filtered = applyFilter(task);
  filtered.forEach((item) => createblock(item));
}

btnNewAsk.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    alert("text your new task...");
    return;
  }

  const data = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dados = {
    id: Date.now(),
    text: input.value.trim(),
    data: `${data} às ${hour}`,
    done: false,
  };

  task.push(dados);
  attLocalS();
  render();

  input.value = "";
});

function createblock(dados) {
  const elDiv = document.createElement("div");
  elDiv.classList.add("checkbox");

  const elDivInput = document.createElement("div");
  elDivInput.classList.add("checked");

  const elInput = document.createElement("input");
  elInput.type = "checkbox";
  elInput.checked = dados.done;

  const elDivform = document.createElement("div");
  elDivform.classList.add("textdata");

  const elP = document.createElement("p");
  elP.textContent = dados.data;

  const elSpan = document.createElement("span");
  elSpan.textContent = dados.text;

  const elDivTrash = document.createElement("div");
  elDivTrash.classList.add("trashbtn");

  const skiptbn = document.createElement("i");
  skiptbn.classList.add("fa-solid", "fa-x");

  elDivTrash.appendChild(skiptbn);

  if (dados.done) {
    elP.classList.add("done");
    elSpan.classList.add("done");
  }

  elInput.addEventListener("change", () => {
    dados.done = elInput.checked;
    attLocalS();
    render();
  });

  elDivTrash.addEventListener("click", () => {
    task = task.filter((item) => item.id !== dados.id);
    attLocalS();
    render();
  });

  elDivInput.appendChild(elInput);

  elDivform.appendChild(elSpan);
  elDivform.appendChild(elP);


  elDiv.appendChild(elDivInput);
  elDiv.appendChild(elDivform);
  elDiv.appendChild(elDivTrash);

  taskBlock.appendChild(elDiv);
}

// filtros
btnAll.addEventListener("click", () => {
  currentFilter = "all";
  render();
});

btnActive.addEventListener("click", () => {
  currentFilter = "active";
  render();
});

btnCompleted.addEventListener("click", () => {
  currentFilter = "completed";
  render();
});

// carregar ao abrir
document.addEventListener("DOMContentLoaded", () => {
  task = getTasks();
  render();
});
