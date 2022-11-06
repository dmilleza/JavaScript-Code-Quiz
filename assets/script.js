var startB = document.querySelector("#startB");
var modal = document.querySelector(".modal");
var backB = document.querySelector("#back");
var clearB = document.querySelector(".clear");
var viewLink = document.querySelector(".view");
var timer = document.querySelector(".timeNum");

var correct = 0;
var time;

viewLink.addEventListener("click", () => {
  modal.showModal();
});

backB.addEventListener("click", () => {
  modal.close();
});

startB.addEventListener("click", () => {
  var home = document.querySelector(".home");
  home.setAttribute("style", "display:none");
  var quests = document.querySelector(".questions");
  quests.setAttribute("style", "display: block");
});

function startQuiz() {
  var isWin = false;
  time = 60
  viewLink.disabled = true;

  showQuestions()
  startTimer()

}
