//targets corresponding HTML sections
const highScores = document.querySelector("#highScores");

const timer = document.querySelector("#timer");

const welcomeScreen = document.querySelector("#welcome");

const questionScreen = document.querySelector("#questions");

const enterHighScore = document.querySelector("#hsEntry");

const scoreList = document.querySelector("#scoreList");

const questionText = document.querySelector("#questionText");

const answersList = document.querySelector("#answerList");

const asnwerStatus = document.querySelector("#answerStatus")

//targets HTML buttons. Buttons use clickEvent to display desired section and hide others.
const btnStartQuiz = document.querySelector("#startQuiz");

const btnLogScore = document.querySelector("#logScore");

const btnGoBack = document.querySelector("#goBack");

const btnClearScore = document.querySelector("#clearScore"); //use .pop to remove last entry from array

//targets recordedScore and recordName text area

const recordedScore = document.querySelector("#recordedScore"); //displays user score

const recordName = document.querySelector("#recordName"); //lets user input initials

//TODO: view high scores <-- come back when high scores screen is done and use clickEvent to pull up screen
// function viewHighScores() {}

//countdown: timer counts down from 90 seconds during entire game. When complete, displays enterHighScore
let timeLeft = 90;

function countdown() {
  const timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timer.textContent = "Time Left: " + timeLeft;
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

//start quiz button
btnStartQuiz.addEventListener("click", function() {
  welcomeScreen.style.display = "none";
  questionScreen.style.display = "flex";
  countdown();
  playQuestions();
});

function endQuiz() {
  timer.textContent = '';
  questionScreen.style.display = "none";
  enterHighScore.style.display = "flex";
}

//quiz questions and answers
let questionsArray = [
  {
    question: "Which of these is NOT a JavaScript data type?",
    answerChoices: ["Number", "String", "Booyah", "Object"],
    correctAnswer: "Booyah"
  },
  {
    question: "What does a for loop do?",
    answerChoices: ["Repeats a block of code a specified number of times", "Repeats a block of code while a condition is true", "Loops through the properties of an object", "Specifies many alternative blocks of code to be executed."],
    correctAnswer: "Repeats a block of code a specified number of times"
  },
  {
    question: "What is a block of code designed to perform a particular task called?",
    answerChoices: ["Object", "Function", "Event", "Array"],
    correctAnswer: "Function"
  },
  {
    question: "What does Math.floor do?",
    answerChoices: ["Rounds up to the nearest integer.", "Returns the lowest value in a list of arguments.", "Returns a random number.", "Rounds down to the nearest integer."],
    correctAnswer: "Rounds down to the nearest integer."
  },
  {
    question: "How is an ID represented in JavaScript?",
    answerChoices: [".myItem", "#myItem", "@myItem", "$myItem"],
    correctAnswer: "#myItem"
  },
  {
    question: "How is a single-line comment denoted in Javascript?",
    answerChoices: ["<!--comment-->", "/*comment*/", "{comment}", "//comment"],
    correctAnswer: "//comment"
  },
  {
    question: "Which keyword is used for variables that cannot be reassigned?",
    answerChoices: ["var", "const", "let", "function"],
    correctAnswer: "const"
  },
  {
    question: "How is an Object Property denoted?",
    answerChoices: ["name:value", "name(value)", "name.value", "nameValue"],
    correctAnswer: "name:value"
  },
  {
    question: "What is it called when you write code without the use of third party APIs?",
    answerChoices: ["Plain Javascript", "Bland Javascript", "Tasty Javascript", "Vanilla Javascript"],
    correctAnswer: "Vanilla Javascript"
  },
  {
    question: "Which keyword removes the last item of an array?",
    answerChoices: ["myArray.push()", "myArray.pop()", "myArray.slice()", "myArray.shift()"],
    correctAnswer: "myArray.pop()"
  }
]

let questionsCount = 0;

let userScore = 0;

function playQuestions() {
  questionText.textContent = '';
  answersList.textContent = '';
  answerStatus.textContent = '';

  questionText.textContent = questionsArray[questionsCount].question;

  for(var i = 0; i < questionsArray[questionsCount].answerChoices.length; i++) {
    var li = document.createElement("li");
    li.textContent = questionsArray[questionsCount].answerChoices[i];
    li.setAttribute("style", `color:white; background: var(--darkShade); margin-top: 15px; padding: 15px;`);
    answersList.appendChild(li);
    li.addEventListener('click', function() {
        if (this.textContent === questionsArray[questionsCount].correctAnswer) {
        answerStatus.textContent = 'Correct!';
        userScore = userScore + 100;
        localStorage.setItem("userScore", userScore);
      } else {
        answerStatus.textContent = 'Incorrect';
        timeLeft = timeLeft - 10;
      }
      nextQuestion();
  })
  function nextQuestion() {
    setTimeout(function() {
      //move to next question        
      while (questionsCount < questionsArray.length-1) {
        questionsCount++;
        playQuestions();
      } if (questionsCount === questionsArray.length-1) {
        endQuiz();
      }
    },1000)
  }
  })
}



// //TODO: High Score Entry
recordedScore.textContent = "Your Score Is: " + localStorage.getItem("userScore", userScore);

const allScores = [];

//log high score button
btnLogScore.addEventListener("click", function(event) {
  var initials = recordName.value.trim();
  console.log(initials)
  event.preventDefault();
  localStorage.setItem("initials", JSON.stringify(initials));
  var scoreRecord = initials + ": " + userScore;
  allScores.push(scoreRecord);
  enterHighScore.style.display = "none";
  scoreList.style.display = "flex"; 
})

//TODO: Score List
highScores.textContent = allScores;

btnGoBack.addEventListener("click", function() {
  scoreList.style.display = "none";
  welcomeScreen.style.display = "flex";
})

btnClearScore.addEventListener("click", function() {
  allScores.pop();
})