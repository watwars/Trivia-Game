const main = document.getElementById("main");

function start() {
  score = 0;
  const difficulty = document.getElementById("difficulty").value;
  const url =
    "https://opentdb.com/api.php?amount=10&difficulty=" +
    difficulty +
    "&type=multiple";
  document.getElementById("intro").style.display = "none";
  $.getJSON(url, (data) => {
    real = data;
    data.results.forEach((question) => {
      let questionObj = {};
      questionObj.question = question.question;
      questionObj.answer = question.incorrect_answers;
      questionObj.answer.push(question.correct_answer);
      shuffle(questionObj.answer);
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="each"><p class="question">${questionObj.question}</p>
            <div class="answer">
            <button>${questionObj.answer[0]}</button>
            <button>${questionObj.answer[1]}</button>
            <button>${questionObj.answer[2]}</button>
            <button>${questionObj.answer[3]}</button></div></div>`;
      main.appendChild(div);
    });
  });
  setTimeout(() => {
    const buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length - 1; i++) {
      let array = Array.from(buttons);
      buttons[i].addEventListener("click", function () {
        const answer1 = this;
        const answer = this.innerHTML;
        console.log(answer);
        for (let j = 0; j < 9; j++) {
          if (
            real.results[j].correct_answer == answer ||
            real.results[j].incorrect_answers.includes(answer)
          ) {
            index = j;
          }
        }
        indexbtn = array.indexOf(answer1) + 1;
        console.log(real.results[index].correct_answer);
        if (answer == real.results[index].correct_answer) {
          score++;
          this.classList.add("green");
          hide();
        } else {
          this.classList.add("red");
          hide();
        }
      });
    }
  }, 1000);
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

window.onload = () => {
  setInterval(() => {
    green = document.getElementsByClassName("green");
    red = document.getElementsByClassName("red");
    if (green.length + red.length == 10) {
      document.getElementById("main").style.display = "none";
      document.getElementById("userscore").innerHTML = score;
      document.getElementById("score").style.visibility = "visible";
    }
  }, 20);
};

function hide() {
  const buttons = document.getElementsByTagName("button");
  if (indexbtn % 4 == 0) {
    buttons[indexbtn - 2].style.visibility = "hidden";
    buttons[indexbtn - 3].style.visibility = "hidden";
    buttons[indexbtn].style.visibility = "hidden";
  }
  if (indexbtn % 4 == 1) {
    buttons[indexbtn].style.visibility = "hidden";
    buttons[indexbtn + 1].style.visibility = "hidden";
    buttons[indexbtn + 2].style.visibility = "hidden";
  }
  if (indexbtn % 4 == 2) {
    buttons[indexbtn - 2].style.visibility = "hidden";
    buttons[indexbtn].style.visibility = "hidden";
    buttons[indexbtn + 1].style.visibility = "hidden";
  }
  if (indexbtn % 4 == 3) {
    buttons[indexbtn - 3].style.visibility = "hidden";
    buttons[indexbtn - 2].style.visibility = "hidden";
    buttons[indexbtn].style.visibility = "hidden";
  }
}
