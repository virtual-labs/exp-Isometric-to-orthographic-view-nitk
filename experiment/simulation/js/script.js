const data = [
  {
    step: 1,
    title: "Draw the front view",
    questions: [
      {
        question: " In orthographic projections, the hidden lines indicate: ",
        options: ["Holes", "Position of cut", "Geometric centre", "Plane change"],
        answer: 0,
        buttonClass: "btnAxis",
      },
      {
        question: "How many views are we going to draw in this experiment?",
        options: ["2", "3", "4", "5"],
        answer: 1,
        buttonClass: "btnVPHP",
      },
    ],
  },
  {
    step: 2,
    title: "Draw the Top view",
    questions: [
      // {
      //   question: "The length in isometric drawing of line is 20 cm. What is the true length of it?",
      //   options: ["24.53 cm", "15.46 cm", "19.31 cm", "23.09 cm"],
      //   answer: 0,
      //   buttonClass: "btnPyramid",
      // },
      {
        question: "What views are we going to draw in this experiment?",
        options: ["Top, Side, Isometric", "Front, Top, Side", "Front, Isometric, auxiliary", "Side, Front, auxiliary"],
        answer: 1,
        buttonClass: "btnA",
      },
    ],
  },
  {
    step: 3,
    title: "Draw the Top view",
    questions: [
      {
        question: "The planes parallel to any of the two isometric lines are called ________ planes.",
        options: ["parallel", "auxiliary", "isometric", "oblique"],
        answer: 2,
        buttonClass: "btnC",
      },
    ],
  },
  {
    step: 4,
    title: "Draw the projector for RHS profile Plane",
    questions: [
      {
        question: "At what angle should the projection lines from the top view deflect and reach the RHS Profile plane?",
        options: ["15 degrees", "60 degrees", "45 degrees", "30 degrees"],
        answer: 2,
        buttonClass: "btnB",
      },
    ],
  },
  {
    step: 5,
    title: "Trace the RHS View/Side View",
    questions: [
      {
        question: "Why do we need a Profile plane?",
        options: [" To draw the auxiliary projection", "To draw the hidden side of the solid", "To draw the top view", "To draw the side view"],
        answer: 3,
        buttonClass: "btnD",
      },
    ],
  },
  {
    step: 6,
    title: "Draw the final Orthographic Side view",
    questions: [
      {
        question: "How would be the projection of the side view in this experiment",
        options: [" A 15 x 15 square inside a 30 x 30 square.", "A 15 x 15 square inside 40 x 30 rectangle.", " 2 rectangles inside 40 x 30 rectangle.", " A trapezoid and triangle."],
        answer: 0,
        buttonClass: "btnE",
      },
    ],
  },
  // {
  //   step: 7,
  //   title: "Draw the top view of pyramid whose axis makes α with VP",
  //   questions: [
  //     {
  //       question: "The Top view of an object is viewed on which plane?",
  //       options: [
  //         "Horizontal Plane",
  //         "Parallel Plane",
  //         "Vertical Plane",
  //         "Profile Plane",
  //       ],
  //       answer: 0,
  //       buttonClass: "btnF",
  //     },
  //   ],
  // },
  // {
  //   step: 8,
  //   title: "Draw the final top view as required",
  //   questions: [
  //     {
  //       question: "The front view of an object is viewed on which plane?",
  //       options: [
  //         "Horizontal Plane",
  //         "Parallel Plane",
  //         "Vertical Plane",
  //         "Profile Plane",
  //       ],
  //       answer: 2,
  //       buttonClass: "btnG",
  //     },
  //   ],
  // },
];
const quizDiv = document.querySelector(".quiz-div");
const questionDiv = document.querySelector(".question");
const answersDiv = document.querySelector(".answers");
const questionBtnDiv = document.querySelector(".question-btn");
const practiceDiv = document.querySelector(".practice");
const canvas = document.querySelector("#simscreen");
const ctx = canvas.getContext("2d");
let currentStepCount = 1;
let currentStep;
let currentQuestions;
let currentQuestionIndex = 0;

// stepNo & Step TITLE
const stepNumber = document.querySelector(".practice-step-no");
const stepTitle = document.querySelector(".practice-step-info");

// buttons
const btnAxis = document.querySelector(".btn-axis");
btnAxis.addEventListener("click", drawAxis);
const btnVPHP = document.querySelector(".btn-vp-hp");
btnVPHP.addEventListener("click", nameVPHP);
// const btnPyramid = document.querySelector(".btn-pyramid");
// btnPyramid.addEventListener("click", drawPyramid);
const btnA = document.querySelector(".btn-a");
btnA.addEventListener("click", () => a());
const btnC = document.querySelector(".btn-c");
btnC.addEventListener("click", () => b());
const btnB = document.querySelector(".btn-b");
btnB.addEventListener("click", () => c());
const btnD = document.querySelector(".btn-d");
btnD.addEventListener("click", () => d());
const btnE = document.querySelector(".btn-e");
btnE.addEventListener("click", () => e());
// const btnF = document.querySelector(".btn-f");
// btnF.addEventListener("click", () => f());
// const btnG = document.querySelector(".btn-g");
// btnG.addEventListener("click", () => g());
const btnNext = document.querySelector(".btn-next");
btnNext.addEventListener("click", nextStep);
const btnReset = document.querySelector(".btn-reset");
btnReset.addEventListener("click", resetAll);
const btnTop = document.querySelector(".btn-top");
btnTop.addEventListener("click", movetoTop);
const validateAnswer = document.createElement("span");
validateAnswer.classList.add("validate");

function displayDiv(ele) {
  const taskScreen = document.querySelectorAll(".task-screen");
  taskScreen.forEach((task) => {
    task.classList.add("hide");
  });
  if (ele.classList.contains("tool-objective")) {
    document.querySelector(".objective").classList.remove("hide");
  }
  if (ele.classList.contains("tool-apparatus")) {
    document.querySelector(".apparatus").classList.remove("hide");
  }
  if (ele.classList.contains("tool-practice")) {
    document.querySelector(".practice").classList.remove("hide");
    if (currentStep === undefined) initialSetup();
  }
}

function nextStep() {
  currentStep = data.find((step) => currentStepCount === step.step);
  stepNumber.textContent = currentStepCount;
  stepTitle.textContent = currentStep.title;
  btnNext.setAttribute("disabled", true);
  btnNext.classList.remove("blink");
  initialSetup();
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    displayQuestionDiv(currentQuestions[currentQuestionIndex]);
  } else {
    quizDiv.classList.add("hide");
    if (currentStepCount === data.length) {
      stepNumber.classList.add("hide");
      stepTitle.classList.add("hide");
      document.querySelector(".final-statement").classList.remove("hide");
      btnNext.classList.add("hide");
      btnNext.classList.remove("blink");
    } else {
      currentStepCount += 1;
      btnNext.removeAttribute("disabled");
      btnNext.classList.add("blink");
    }
  }
}
function drawAxis() {
  canvas.classList.remove("hide");
  canvas.scrollIntoView();
  btnTop.classList.remove("hide");
  ctx.strokeStyle = "#B9B6B1";
  animate(30, 250, 680, 250, 0, nameAxis);
}

function nameAxis() {
  ctx.font = "bold 20px Nunito sans MS";
  ctx.fillText("X", 10, 255);
  ctx.fillText("Y", 690, 255);
  btnAxis.classList.add("hide");
  nextQuestion();
}

function nameVPHP() {
  ctx.fillText("VP", 40, 240);
  ctx.fillText("HP", 40, 270);
  btnVPHP.classList.add("hide");
  nextQuestion();
  ctx.stroke();
  ctx.font = "bold 14px Comic Sans MS";
  ctx.fillText("Solid lines", 20, 435);
  ctx.fillText("Projection lines", 20, 455);
  ctx.closePath();

  // Adjust coordinates to move the shape up
  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 2;
  ctx.moveTo(350, 220); // Move up by 20 pixels (originally 390 - 40, 250)
  ctx.lineTo(510, 220); // Move up by 20 pixels (originally 550 - 40, 250)
  ctx.lineTo(410, 100); // Move up by 20 pixels (originally 450 - 40, 130)
  ctx.lineTo(350, 100); // Move up by 20 pixels (originally 390 - 40, 130)
  ctx.lineTo(350, 220); // Move up by 20 pixels (originally 390 - 40, 250)
  ctx.lineTo(510, 220); // Move up by 20 pixels (originally 550 - 40, 250)
  ctx.lineTo(510, 160); // Move up by 20 pixels (originally 550 - 40, 190)
  ctx.lineTo(460, 160); // Move up by 20 pixels (originally 500 - 40, 190)
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(10, 450);
  ctx.arc(10, 450, 7, 0, 2 * Math.PI);
  ctx.fillStyle = "#3590ae";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(10, 430);
  ctx.arc(10, 430, 7, 0, 2 * Math.PI);
  ctx.fillStyle = "#d9b28a";
  ctx.fill();
  ctx.closePath();
}

var img = document.getElementById('question');
function drawLine(x1, y1, x2, y2, ratio) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  x2 = x1 + ratio * (x2 - x1);
  y2 = y1 + ratio * (y2 - y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  document.getElementById("question").style.display="block";
  document.getElementById("supptext").style.display="block"
}

function animate(x1, y1, x2, y2, ratio, cb) {
  ratio = ratio || 0;
  drawLine(x1, y1, x2, y2, ratio, cb);
  if (ratio > 1) {
    cb();
  } else if (ratio < 1) {
    animationStatus = true;
    requestAnimationFrame(function () {
      animate(x1, y1, x2, y2, ratio + 0.02, cb);
    });
  }
}

function animateRecursively(x1, y1, x2, y2, ratio) {
  ratio = ratio || 0;
  drawLine(x1, y1, x2, y2, ratio);
  if (ratio < 1) {
    animationStatus = true;
    requestAnimationFrame(function () {
      animateRecursively(x1, y1, x2, y2, ratio + 0.02);
    });
  }
}

function initialSetup() {
  currentStep = data.find((d) => d.step == currentStepCount);
  stepNumber.textContent = currentStepCount;
  stepTitle.textContent = currentStep.title;
  currentQuestions = currentStep.questions;
  currentQuestionIndex = 0;
  quizDiv.classList.remove("hide");
  displayQuestionDiv(currentQuestions[currentQuestionIndex]);
}

function displayQuestionDiv(questions) {
  const { question, options, answer, buttonClass } = questions;
  questionDiv.innerHTML = `${currentQuestionIndex + 1}. ${question}`;
  answersDiv.innerHTML = "";
  options.map((option, index) => {
    answersDiv.innerHTML += `
    <div class="input-group">
    <input type="radio" name="${question}" id="ans${index}" class="option" onchange='checkAnswer(this, ${index}, ${answer}, ${buttonClass})'>
    <label for="rad1">${option}</label>
  </div>
    `;
  });
}

function checkAnswer(ele, index, answer, buttonClass) {
  const optionSelected = ele.parentNode;
  optionSelected.classList.remove("wrong");
  optionSelected.classList.remove("correct");
  if (index === answer) {
    optionSelected.classList.add("correct");
    buttonClass.classList.add("anim");
    buttonClass.classList.remove("hide");
    validateAnswer.innerHTML = "Right answer👍";
    answersDiv.appendChild(validateAnswer);
  } else {
    optionSelected.classList.add("wrong");
    buttonClass.classList.remove("anim");
    buttonClass.classList.add("hide");
    validateAnswer.innerHTML = "Wrong answer, please check the options again👎";
    answersDiv.appendChild(validateAnswer);
  }
}
function resetAll() {
  ctx.clearRect(0, 0, 750, 500);
  currentStepCount = 1;
  currentStep;
  currentQuestions;
  currentQuestionIndex = 0;
  initialSetup();
  document.querySelectorAll(".btn").forEach((b) => b.classList.add("hide"));
  btnNext.setAttribute("disabled", true);
  btnNext.classList.remove("hide");
  btnReset.classList.remove("hide");
  stepNumber.classList.remove("hide");
  stepTitle.classList.remove("hide");
  document.querySelector(".final-statement").classList.add("hide");
  canvas.classList.add("hide");
}

function movetoTop() {
  practiceDiv.scrollIntoView();
}


function a() {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#d9b28a";

  animate(460, 160, 460, 280); // Updated from (500 - 40, 190, 500 - 40, 310)
  animate(410, 100, 410, 400); // Updated from (450 - 40, 130, 450 - 40, 430)
  animate(350, 220, 350, 280); // Updated from (390 - 40, 250, 390 - 40, 310)
  
  ctx.closePath();

  btnA.classList.add("hide");
  nextQuestion();
}

function b() {
  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 1;
  animate(350, 280, 510, 280); // Updated from (390 - 40, 310, 550 - 40, 310)
  animate(510, 280, 510, 400); // Updated from (550 - 40, 310, 550 - 40, 430)
  animate(510, 400, 350, 400); // Updated from (550 - 40, 430, 390 - 40, 430)
  animate(350, 400, 350, 280); // Updated from (390 - 40, 430, 390 - 40, 310)

  animate(460, 280, 460, 340); // Updated from (500 - 40, 310, 500 - 40, 370)
  animate(460, 340, 510, 340); // Updated from (500 - 40, 370, 550 - 40, 370)
  animate(410, 280, 410, 400); // Updated from (450 - 40, 310, 450 - 40, 430)
  ctx.closePath();
  
  btnC.classList.add("hide");
  nextQuestion();
}

function c() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(290, 420); // Moved further left by 20 pixels
  ctx.font = "12px Arial";
  ctx.lineTo(290, 70); // Moved further left by 20 pixels
  ctx.stroke();
  ctx.moveTo(290, 340); // Moved further left by 20 pixels
  ctx.arc(290, 340, 20, (5 / 4) * Math.PI, 1.5 * Math.PI);
  ctx.stroke();
  ctx.fillText("45°", 258, 300); // Moved further left by 20 pixels
  ctx.closePath();
  
  ctx.beginPath();
  ctx.strokeStyle = "#d9b28a";
  ctx.lineWidth = 4; // Increased width for the connecting line
  animate(350, 280, 290, 280); // Updated to connect black and blue lines
  animate(460, 340, 290, 340); // Updated to connect black and blue lines
  animate(350, 400, 290, 400); // Updated to connect black and blue lines
  animate(350, 220, 290, 220); // Updated to connect black and blue lines
  animate(460, 160, 290, 160); // Updated to connect black and blue lines
  animate(350, 100, 290, 100); // Updated to connect black and blue lines
  animate(
    290 - 40 * Math.sin(Math.PI / 4),
    280 - 40 * Math.sin(Math.PI / 4),
    290,
    280
  ); // Adjusted to connect new black line position
  animate(
    290 - 125 * Math.sin(Math.PI / 4),
    340 - 125 * Math.sin(Math.PI / 4),
    290,
    340
  ); // Adjusted to connect new black line position
  animate(
    290 - 210 * Math.sin(Math.PI / 4),
    400 - 210 * Math.sin(Math.PI / 4),
    290,
    400
  ); // Adjusted to connect new black line position
  ctx.closePath();

  btnB.classList.add("hide");
  nextQuestion();
}






function d() {
  ctx.beginPath();

  ctx.strokeStyle = "#d9b28a";
  ctx.lineWidth = 2;

  // Adjusting y-coordinates to move the whole set of lines up
  const moveUp = 30; // Adjust this value as needed to move up by the desired amount

  animate(
    330 - 40 * Math.sin(Math.PI / 4) - 40,
    310 - 40 * Math.sin(Math.PI / 4) - moveUp,
    330 - 40 - 40 * Math.sin(Math.PI / 4),
    310 - 40 * Math.sin(Math.PI / 4) - 150 - moveUp
  );
  animate(
    330 - 125 * Math.sin(Math.PI / 4) - 40,
    370 - 125 * Math.sin(Math.PI / 4) - moveUp,
    330 - 125 * Math.sin(Math.PI / 4) - 40,
    370 - 125 * Math.sin(Math.PI / 4) - 150 - moveUp
  );
  animate(
    330 - 210 * Math.sin(Math.PI / 4) - 40,
    430 - 210 * Math.sin(Math.PI / 4) - moveUp,
    330 - 210 * Math.sin(Math.PI / 4) - 40,
    430 - 210 * Math.sin(Math.PI / 4) - 150 - moveUp
  );
  animate(
    330 - 210 * Math.sin(Math.PI / 4) - 40,
    430 - 210 * Math.sin(Math.PI / 4) - 32 - moveUp,
    330 - 40,
    430 - 210 * Math.sin(Math.PI / 4) - 32 - moveUp
  );
  animate(330 - 210 * Math.sin(Math.PI / 4) - 40, 190 - moveUp, 330 - 40, 190 - moveUp);
  animate(330 - 210 * Math.sin(Math.PI / 4) - 40, 130 - moveUp, 330 - 40, 130 - moveUp);

  ctx.closePath();
  btnD.classList.add("hide");
  nextQuestion();
}

function canvas_arrow(context, fromx, fromy, tox, toy, r) {
  var x_center = tox;
  var y_center = toy;

  var angle;
  var x;
  var y;

  context.beginPath();

  angle = Math.atan2(toy - fromy, tox - fromx);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.moveTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  context.closePath();

  context.fill();
}

function e() {
  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 2.5;
  const moveUp = 30;
  ctx.moveTo(330 - 210 * Math.sin(Math.PI / 4) - 40, 130 - moveUp);
  ctx.lineTo(330 - 40 * Math.sin(Math.PI / 4) - 40, 130 - moveUp);
  ctx.lineTo(330 - 40 * Math.sin(Math.PI / 4) - 40, 250 - moveUp);
  ctx.lineTo(330 - 210 * Math.sin(Math.PI / 4) - 40, 250 - moveUp);
  ctx.lineTo(330 - 210 * Math.sin(Math.PI / 4) - 40, 130 - moveUp);
  ctx.stroke();

  ctx.moveTo(330 - 125 * Math.sin(Math.PI / 4) - 40, 250 - moveUp);
  ctx.lineTo(330 - 125 * Math.sin(Math.PI / 4) - 40, 190 - moveUp);
  ctx.lineTo(330 - 40 * Math.sin(Math.PI / 4) - 40, 190 - moveUp);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  // Adjusted y-coordinates by subtracting 30 from each original y-coordinate value
// ctx.beginPath();
ctx.moveTo(600 - 40, 105);  // was 135
ctx.lineTo(600 - 40, 215);  // was 245
ctx.stroke();
ctx.moveTo(576 - 40, 165);  // was 195
ctx.lineTo(576 - 40, 215);  // was 245
ctx.stroke();
ctx.moveTo(395 - 40, 420);  // was 450
ctx.lineTo(545 - 40, 420);  // was 450
ctx.stroke();
ctx.moveTo(395 - 40, 90);  // was 120
ctx.lineTo(445 - 40, 90);  // was 120
ctx.stroke();
ctx.moveTo(330 - 210 * Math.sin(Math.PI / 4) - 40, 90);  // was 120
ctx.lineTo(330 - 40 * Math.sin(Math.PI / 4) - 40, 90);   // was 120
ctx.stroke();
canvas_arrow(ctx, 600 - 40, 100, 600 - 40, 215, 5);  // was 130 and 245
canvas_arrow(ctx, 600 - 40, 215, 600 - 40, 105, 5);  // was 245 and 135
canvas_arrow(ctx, 576 - 40, 105, 576 - 40, 215, 5);  // was 135 and 245
canvas_arrow(ctx, 576 - 40, 215, 576 - 40, 165, 5);  // was 245 and 195
canvas_arrow(ctx, 390 - 40, 420, 545 - 40, 420, 5);  // was 450 and 450
canvas_arrow(ctx, 560 - 40, 420, 395 - 40, 420, 5);  // was 450 and 450
canvas_arrow(ctx, 390 - 40, 90, 445 - 40, 90, 5);  // was 120 and 120
canvas_arrow(ctx, 560 - 40, 90, 395 - 40, 90, 5);  // was 120 and 120
canvas_arrow(
  ctx,
  330 - 210 * Math.sin(Math.PI / 4) - 40,
  90,  // was 120
  330 - 40 * Math.sin(Math.PI / 4) - 40 - 5,
  90,  // was 120
  5
);
canvas_arrow(
  ctx,
  330 - 40 * Math.sin(Math.PI / 4) - 40,
  90,  // was 120
  330 - 210 * Math.sin(Math.PI / 4) - 40 + 5,
  90,  // was 120
  5
);
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.fillText("15", 410 - 40, 82);  // was 112
ctx.fillText("40", 460 - 40, 415);  // was 445
ctx.fillText("30", 330 - 120 * Math.sin(Math.PI / 4) - 50, 85);  // was 115
ctx.closePath();

ctx.save();
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.translate(550, 160);
ctx.rotate(-Math.PI / 2);
ctx.fillText("30", 0, 0);
ctx.restore();

ctx.save();
ctx.textAlign = "center";
ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = " 12px Arial";
  ctx.translate(525, 190);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("15", 0, 0);
  ctx.restore();

  btnE.classList.add("hide");
   quizDiv.classList.add("hide");
   document.querySelector(".final-statement").classList.remove("hide");
   stepNumber.classList.add("hide");
   stepTitle.classList.add("hide");
}

// function g() {
//   ctx.beginPath();
//   ctx.strokeStyle = "#0c81a8";
//   ctx.beginPath();
//   ctx.setLineDash([5, 10]);
//   ctx.moveTo(570 - 119.5 + 5, 250 - 300 / Math.sqrt(17));
//   ctx.lineTo(570 + 26.5 + 5, 250);
//   ctx.stroke();
//   ctx.beginPath();
//   ctx.setLineDash([]);
//   animateRecursively(
//     570 - 119.5 + 53 + 5 - 18,
//     250,
//     570 - 119.5 + 53 + 5,
//     250 - 300 / Math.sqrt(17),
//     0
//   );
//   animateRecursively(
//     570 - 119.5 + 53 + 5 - 18,
//     250,
//     570 - 119.5 - 18 + 5,
//     250,
//     0
//   );
//   animateRecursively(
//     570 - 119.5 - 18 + 5,
//     250,
//     570 - 119.5 + 5,
//     250 - 300 / Math.sqrt(17),
//     0
//   );
//   animateRecursively(
//     570 - 119.5 + 5,
//     250 - 300 / Math.sqrt(17),
//     570 - 119.5 + 53 + 5,
//     250 - 300 / Math.sqrt(17),
//     0
//   );
//   animateRecursively(
//     570 - 119.5 + 5 + 53,
//     250 - 300 / Math.sqrt(17),
//     570 + 26.5 + 5,
//     250,
//     0
//   );
//   animateRecursively(570 - 119.5 - 18 + 5 + 53, 250, 570 + 26.5 + 5, 250, 0);
//   btnG.classList.add("hide");
//   nextQuestion();
// }
