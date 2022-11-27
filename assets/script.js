var modal = document.querySelector(".modal");
var backB = document.querySelector("#back");
var clearB = document.querySelector("#clear");
var viewLink = document.querySelector(".view");

// displays high scores in a modal
viewLink.addEventListener("click", () => {
  modal.showModal();
});

// close modal
backB.addEventListener("click", () => {
  modal.close();
});

var timer;
var correct;
var time;
var viewHome = true;
var score;

// hides "view high scores" link when taking quiz
function checkHome() {
  if (viewHome === false) {
    viewLink.setAttribute("style", "visibility: hidden");
  } else {
    viewLink.setAttribute("style", "visibility: visible ");
  }
}

var startB = document.querySelector("#startB");

// pressing "start" button
startB.addEventListener("click", () => {
  viewHome = false;
  currentQ = 0;
  score = 0;
  time = 60;
  checkHome();
  showQuestions();
  startQuiz();
  getQuestions();
});

var timeNum = document.querySelector(".timeNum");

// starts timer at 60 seconds
function startQuiz() {
  timer = setInterval(function () {
    time--;
    timeNum.textContent = time;

    // if timer runs out, ends quiz
    if (time <= 0) {
      showDoneBox();
    }
  }, 1000);
}
var home = document.querySelector(".home");
var quests = document.querySelector(".questions");
var done = document.querySelector(".done");

quests.setAttribute("style", "display: block");

function showQuestions() {
  quests.setAttribute("style", "display: block");
  home.setAttribute("style", "display: none");
}

// goes to default webpage in order for user to take quiz again
function showHome() {
  viewHome = true;
  checkHome();
  home.setAttribute("style", "display: block");
  quests.setAttribute("style", "display: none");
  done.setAttribute("style", "display: none");
}

var quesBox = document.querySelector(".qBox");

// displays questions and choices for the quiz
function getQuestions() {
  var question = document.querySelector(".question");
  question.innerHTML = "";
  quesBox.innerHTML = "";
  hr.setAttribute("style", "display: none");
  feedback.setAttribute("style", "display: none");
  question.textContent = questions[currentQ].title;

  // choices are buttons the user can click on
  for (var i = 0; i < questions[currentQ].choices.length; i++) {
    var choiceB = document.createElement("button");
    choiceB.className = "quesB";
    choiceB.textContent = questions[currentQ].choices[i];
    quesBox.appendChild(choiceB);
    choiceB.addEventListener("click", checkChoice);
  }
}

var currentQ;
var hr = document.querySelector("hr");
var feedback = document.querySelector(".feedback");

function checkChoice(event) {
  var choice = event.target;

  // if correct answer is clicked, flash "correct"
  if (choice.textContent === questions[currentQ].answer) {
    time += 10;
    score += 20;
    choice.className = "quesBc";
    hr.setAttribute("style", "display: block");
    feedback.setAttribute("style", "display: block");
    feedback.innerHTML = "Correct!";
    var fbTime = 2;

    // flashes "correct" for two seconds
    var rcFeedback = setInterval(() => {
      fbTime--;
      if (fbTime === 0) {
        clearInterval(rcFeedback);
        currentQ++;
        // if there's more questions in the array, get next question
        if (currentQ < questions.length) {
          getQuestions();
        } else {
          showDoneBox();
        }
      }
    }, 1000);
  } else {
    // code for choosing incorrect answer
    time -= 10;
    choice.className = "quesBw";
    hr.setAttribute("style", "display: block");
    feedback.setAttribute("style", "display: block");
    feedback.innerHTML = "Wrong!";
    var fbTime2 = 1;
    // flashes "wrong" for a second
    var wcFeedbck = setInterval(() => {
      fbTime2--;
      if (fbTime2 === 0) {
        choice.className = "quesB";
        hr.setAttribute("style", "display: none");
        feedback.setAttribute("style", "display: none");
        feedback.innerHTML = "";
      }
    }, 1000);
  }
}

var doneB = document.querySelector(".done");

// shows quiz score and gets user's initials
function showDoneBox() {
  clearInterval(timer);
  timeNum.textContent = "";
  var scoreResult = document.querySelector(".score");
  scoreResult.textContent = score;
  quests.setAttribute("style", "display: none");
  doneB.setAttribute("style", "display: block");
}

var initialBox = document.querySelector(".initials");
var storedScores = [];

// runs when initials are submitted
function addScoreInfo() {
  if (initialBox.value === "") {
    return;
  } else {
    // converts string to uppercase and adds a period in between letters
    var initials = initialBox.value;
    var initials1 = initials.toUpperCase();
    var initials2 = initials1.trim();
    var initials3 = initials2.split("");
    var initials4 = initials3.join(".");
    var quizTaker = {
      name: initials4,
      finalScore: score,
    };
    // adds user's info to array for local storage
    storedScores.push(quizTaker);
    initialBox.value = "";
    storeHighScores();
    showHome();
    renderHighScores();
  }
}

function storeHighScores() {
  localStorage.setItem("scores", JSON.stringify(storedScores));
}

var highScoreBox = document.querySelector(".highScores");

// displays stored high scores to modal
function renderHighScores() {
  highScoreBox.innerHTML = "";
  // sorts high scores in descending order
  storedScores.sort((a, b) => b.finalScore - a.finalScore);
  var storedScoresSorted = storedScores;
  for (var i = 0; i < storedScores.length; i++) {
    var singleScore = storedScores[i];
    var dataContainer = document.createElement("div");
    dataContainer.className = "playerInfo";
    var playerName = document.createElement("p");
    playerName.textContent = singleScore.name;
    var playerScore = document.createElement("p");
    playerScore.textContent = singleScore.finalScore;
    dataContainer.append(playerName, playerScore);
    highScoreBox.append(dataContainer);
  }
}

// when "clear scores" is clicked, all the saved scores are erased for good
function clearScores() {
  storedScores.splice(0);
  storeHighScores();
  renderHighScores();
}

function init() {
  var getScores = JSON.parse(localStorage.getItem("scores"));
  if (getScores !== null) {
    storedScores = getScores;
  }
  renderHighScores();
}

// when page loads, high scores are shown on modal when opened
init();
