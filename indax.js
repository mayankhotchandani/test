var trivia = [
  {
    question:
      "Q. What does the acronym USB stand for when referring to a computer port?",
    answerSet: {
      A: "User Should Buy",
      B: "Universal Serial Bus",
      C: "Uber Stretch Bus",
      D: "United States Baseball",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Q. What do you call the small image icons used to express emotions or ideas in digital communication?",
    answerSet: {
      A: "Emojis",
      B: "GIF's",
      C: "JPEG's",
      D: "Texts from Mom",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Q. When referring to a computer monitor, what does the acronym LCD stand for?",
    answerSet: {
      A: "Limited Cypher Ducks",
      B: "Light Collision Detector",
      C: "Laser Color Display",
      D: "Liquid Crystal Display",
    },
    correctAnswer: "d",
  },
  {
    question: "Q. Which of these is NOT a operating system?",
    answerSet: {
      A: "Windows",
      B: "Android",
      C: "Linux",
      D: "Ledges",
    },
    correctAnswer: "d",
  },
  {
    question:
      "Q. When referring to computer memory, what does that acronym RAM stand for?",
    answerSet: {
      A: "Real Awesome Memory",
      B: "Random Access Memory",
      C: "Razor Alignment Memory",
      D: "Reacting Automitic Memory",
    },
    correctAnswer: "b",
  },
  {
    question: 'Q. In computer science, what does "GUI" stand for?',
    answerSet: {
      A: "Graphical User Interface",
      B: "Gooey Ugly Invention",
      C: "GUI Ducks",
      D: "Green Umpire Instincts",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Q. Steve Jobs, Steve Wozniak, and Ronald Wayne founded what company in 1976?",
    answerSet: {
      A: "BMW",
      B: "Apple",
      C: "The Linux Foundation",
      D: "Microsoft",
    },
    correctAnswer: "b",
  },
  {
    question: 'Q. In a website browser address bar what does "www" stand for?',
    answerSet: {
      A: "We Will Win",
      B: "Wompa Wompa Wompa",
      C: "World Wide Web",
      D: "Walter Went Wild",
    },
    correctAnswer: "c",
  },
  {
    question: "Q. HTML and CSS are computer languages used to create what?",
    answerSet: {
      A: "Operating Systems",
      B: "Keyboards",
      C: "Web Pages",
      D: "Machine Learning Algorithims",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Q. In a photo editing program, what do the letters RGB stand for?",
    answerSet: {
      A: "Red, Green, Blue",
      B: "Remove Giant Background",
      C: "Ready, Go, Begin",
      D: "Rare Gem Broker",
    },
    correctAnswer: "a",
  },
];
var countdownNumberEl = document.getElementById("countdown-number");
var countdown = 20;

countdownNumberEl.textContent = countdown;

setInterval(function () {
  countdown = --countdown <= 0 ? 20 : countdown;

  countdownNumberEl.textContent = countdown;
}, 1000);

// Starting Countdown Functions
var startTime = 5;
function initCounter() {
  $("#intro").hide();
  $(".timer").removeClass("hidden");
  setInterval(initialCountdown, 1000);
}
function initialCountdown() {
  startTime--;
  if (startTime === 0) {
    clearInterval(initCounter);
    initGame();
    return;
  }
  $(".first-timer").text(startTime);
}

// Answer toggle
$(".answer").click(function () {
  $(".answer").removeClass("selected");
  $(this).addClass("selected");
});

// Game Runtime
function initGame() {
  $("#welcome").hide();
  $("#replaceStr").removeClass("hidden");
  $("#removeStr").hide().fadeIn();
  var gameTime = 21; //21 for production
  var currentQuestion = 0;
  var numIncorrect = 0;
  var numCorrect = 0;
  var gameTimer = setInterval(runTrivia, 1000);
  var restarted = false;
  $("#next-btn").click(function () {
    gameTime = 1;

    return gameTime;
  });

  function runTrivia() {
    var triviaStr = trivia[currentQuestion];
    var answers = triviaStr.answerSet;
    var correctAnswer = triviaStr.correctAnswer;
    var questionArea = $("#question");
    var answerChoices = $("#choices");
    gameTime--;
    // Updates the DOM for each question
    $(".game-timer").text(parseInt(gameTime));
    $("#question-num").html(
      "<h1 class='ques-num'> Question #" + (currentQuestion + 1) + "</h1>"
    );
    questionArea.text(triviaStr.question);
    $.each(answers, function (i, val) {
      $("#" + i).text(i + " : " + val);
    });
    $("#" + correctAnswer).addClass("correct");
    $("#game").fadeIn("slow");

    function showResults() {
      var score = numCorrect * 10;
      $("#number-correct").html("<h3>You got " + numCorrect + " correct.</h3>");
      $("#number-wrong").html("<h3>You got " + numIncorrect + " wrong.</h3>");
      $("#score").text(score + "%");
      $("#result-section").show("slow");
    }

    var selected = $(".selected");
    if (gameTime === 0 && currentQuestion === 9) {
      $("#game").slideUp();
      if (selected.hasClass("correct")) {
        numCorrect++;
      } else {
        numIncorrect++;
      }
      showResults();
      clearInterval(gameTimer);
    } else if (gameTime === 0 && currentQuestion !== 9) {
      gameTime += 21; //21 for finished
      $("#game").fadeOut("fast");
      $(".answer").removeClass("selected");
      if (selected.hasClass("correct")) {
        numCorrect++;
        currentQuestion++;
      } else {
        numIncorrect++;
        currentQuestion++;
      }
      $("#" + correctAnswer).removeClass("correct");
    }
  }
}
function restartGame() {
  $("#game").hide();
  clearInterval();
  $("#welcome").show("slow");
  return (startTime = 5);
}
function nextQuestion() {
  return (gameTime = 0);
}
// add a button that fires this function in the results div
