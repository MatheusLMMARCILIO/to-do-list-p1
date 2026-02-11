const input = document.querySelector(".inputValueText");
const btnNewAsk = document.querySelector(".newAsk");
const trash = document.querySelector(".trashbtn");
const trashicon = document.querySelector("#trash");
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

const task = localStorage.getItem("task");

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
    text: input.value,
    data: `${data} às ${hour}`,
  };

  localStorage.setItem("task", JSON.stringify(dados));

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

  const elDivform = document.createElement('div')
  elDivform.classList.add("textdata")

const elP = document.createElement('p')
elP.innerHTML = dados.text

const elSpan = document.createElement('span')
elSpan.innerHTML = dados.data

const elDivTrash = document.createElement('div')
elDivTrash.classList.add('trashbtn')

const iSkip = document.createElement('i')
iSkip.id = 'skip'
iSkip.classList.add('fa-solid', 'fa-x')

const iTrash = document.createElement('i')
iTrash.id = 'trash'
iTrash.classList.add('fa-solid', 'fa-trash', 'fa-bounce', 'fa-lg')
 
elDivInput.appendChild(elInput);

elDivform.appendChild(elP);
elDivform.appendChild(elSpan);

elDivTrash.appendChild(iSkip);
elDivTrash.appendChild(iTrash);

elDiv.appendChild(elDivInput);
elDiv.appendChild(elDivform);
elDiv.appendChild(elDivTrash);





}

trash.addEventListener("mouseover", () => {
  trashicon.style.display = "flex";
  skipicon.style.display = "none";
});
trash.addEventListener("mouseout", () => {
  trashicon.style.display = "none";
  skipicon.style.display = "flex";
});
