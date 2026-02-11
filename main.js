const input = document.querySelector(".inputValueText");
const btnNewAsk = document.querySelector(".newAsk");
const trash = document.querySelector(".trashbtn");
const skipicon = document.querySelector("#skip");
const formDataText = document.querySelector(".textdata");
const taskBlock = document.querySelector('.activities')

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

const dataCompleta = data + " ás " + hour;

const text = input.value;

const dados = {
  text: text,
  data: dataCompleta,
};

const task = JSON.parse(localStorage.getItem("task")) || []

btnNewAsk.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value === "") {
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
    text: input.value,
    data: `${data} às ${hour}`,
    done: false
  };


  task.push(dados)
  localStorage.setItem("task", JSON.stringify(task));

  createblock(dados);

  input.value = "";
});


function createblock(dados) {

  const elDiv = document.createElement('div')
  elDiv.classList.add('checkbox')

  const elDivInput = document.createElement('div')
  elDivInput.classList.add('checked')

  const elInput = document.createElement('input')
  elInput.type = 'checkbox'
  elInput.id = 'doit'
  elInput.checked = dados.done

  const elDivform = document.createElement('div')
  elDivform.classList.add("textdata")

  const elP = document.createElement('p')
  elP.textContent = dados.data

  const elSpan = document.createElement('span')
  elSpan.textContent = dados.text

  elInput.addEventListener('change', () => {
    
if (dados.done) {
  elP.classList.add('done')
} else {
  elP.classList.remove('done')
}

attLocalS()

  })

  const elDivTrash = document.createElement('div')
  elDivTrash.classList.add('trashbtn')







  elDivInput.appendChild(elInput);

  elDivform.appendChild(elSpan);
  elDivform.appendChild(elP);

  elDiv.appendChild(elDivInput);
  elDiv.appendChild(elDivform);
  elDiv.appendChild(elDivTrash);
  taskBlock.appendChild(elDiv);



}

function attLocalS() {
  localStorage.setItem('task', JSON.stringify(task))
}

document.addEventListener("DOMContentLoaded", () => {
  task.forEach(item => {
    createblock(item);
  });
});
