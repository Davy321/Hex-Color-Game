let colorSample = null; // the color sample element
let answers = []; // array of answer elements
let correctColorCode = null; // color code of actual color sample
let score = 0;
let total = 0;
let mode = false; // false for hex, true for color
let level = 0; // 0 for EZ, 1 for MED, 2 for HARD
let ANumber = 0; // number of answers

// initialize page
window.onload = function() {
  colorSample = document.getElementById("colorSample");

  // initialize array of elements with all possible answers
  answers.push(document.getElementById("a"));
  answers.push(document.getElementById("b"));
  answers.push(document.getElementById("c"));
  answers.push(document.getElementById("d"));
  answers.push(document.getElementById("e"));
  answers.push(document.getElementById("f"));
  answers.push(document.getElementById("g"));
  answers.push(document.getElementById("h"));

  // add onclick events to all possible answers
  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function() {
      markIt(this);
    });
  } // for

  // load a new question
  // loadNewQuestion();
};

// marks current question
function markIt(elem) {
  let gotItRight = false;
  total++;
  
  // record if it is correct
  if (elem.innerHTML == correctColorCode) {
    score++;
    gotItRight = true;
  }
  
  document.getElementById('score').innerHTML = score + " / " + total;
  
  window.setTimeout(function(){
    if(gotItRight) {
      colorSample.innerHTML = "Correct!";
    } else {
      colorSample.innerHTML = "Incorrect!";
    }
  } , 100);
  
  if (total < 10) {
    window.setTimeout(function(){
      loadNewQuestion();
    } , 1300);
  } else {
    finishGame();
  }
}// markIt

// load a new question
function loadNewQuestion() {
  let colorCode = getRandomHexCode();
  
  if (mode) {
    colorSample.innerHTML = "";
    colorSample.innerHTML = colorCode;
    colorSample.style.backgroundColor = "white";
    colorSample.style.height = "100px";
    
    // pick a random location for correct answer
    let solution = Math.floor(Math.random() * ANumber);
    for (let i = 0; i < answers.length; i++) {
      answers[i].innerHTML = "";
      answers[i].style.height = "75px";
      if (i == solution) {
        answers[i].style.backgroundColor = colorCode;
        answers[i].innerHTML = colorCode;
        answers[i].style.color = colorCode;
        answers[i].style.fontSize = "1px";
      } else {
        let temp = getRandomHexCode();
        answers[i].style.backgroundColor = temp;
        answers[i].innerHTML = temp;
        answers[i].style.color = temp;
        answers[i].style.fontSize = "1px";
      }// else
    }// for
  } else {
    colorSample.innerHTML = "";
    colorSample.style.backgroundColor = colorCode;

    // pick a random location for correct answer
    let solution = Math.floor(Math.random() * ANumber);
    for (let i = 0; i < answers.length; i++) {
      if (i == solution) {
        answers[i].innerHTML = colorCode;
      } else {
        answers[i].innerHTML = getRandomHexCode();
      }// else
    }// for
  }
  
  //store correct answer to this question globally
  correctColorCode = colorCode;
  
} // loadNewQuestion

// create random hex code
function getRandomHexCode() {
  let result = []; // final code
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];
  
  result.push("#");
  
  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  
  return result.join(''); // #rrggbb
} // getRandomHexCode

// ends game
function finishGame() {
  document.getElementById('finalScore').innerHTML = score + " / " + total;
  document.getElementById("lightbox").style.display = "block";
}// finishGame

// restarts game
function restartGame() {
  document.getElementById("lightbox").style.display = "none";
  
  total = 0;
  score = 0;
  
  loadNewQuestion();
  document.getElementById('score').innerHTML = "0 / 0";
}// restartGame

function modeSelect() {
  document.getElementById("titleScreen").style.display = "none";
  document.getElementsByTagName("body")[0].style.backgroundColor = "#fadcef"
  document.getElementById("modeSelector").style.display = "block";
}

function levelSelect(m) {
  mode = (m == 0) ? false : true;
  document.getElementById("modeSelector").style.display = "none";
  document.getElementsByTagName("body")[0].style.backgroundColor = "#e3deff"
  document.getElementById("levelSelector").style.display = "block";
}

function startGame(n) {
  level = n;
  ANumber = (level == 0) ? 2 : (level == 1) ? 4 : 8;
  
  if (ANumber == 8 || ANumber == 4) {
    document.getElementsByClassName("container")[0].style.display = "grid";
  } else {
    document.getElementsByClassName("container")[0].style.display = "block";
  }
  
  for (let i = 0; i < answers.length; i++) {
    answers[i].style.display = "none";
  } // for
  
  for (let i = 0; i < ANumber; i++) {
    answers[i].style.display = "block";
  }
  
  loadNewQuestion();
  
  document.getElementById("levelSelector").style.display = "none";
  document.getElementsByTagName("body")[0].style.backgroundColor = "white"
  document.getElementById("mainGame").style.display = "block";
}



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}