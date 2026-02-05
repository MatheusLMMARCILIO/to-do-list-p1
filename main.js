const changeBtn = document.querySelector(".changrBtn");
const formChange = document.querySelector(".formChange");
const newAsk = document.querySelector(".newAsk");

changeBtn.addEventListener("click", (e) => {
  formChange.style.display = "flex";
  changeBtn.style.display = "none";
});

newAsk.addEventListener("click", () => {

});
