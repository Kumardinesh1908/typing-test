const paratxt =
    `The quick brown fox jumps over the lazy dog . Sphinx of black quartz, judge my vow . Pack my box with five dozen liquor jugs . How vexingly quick daft zebras jump !`
    ;

let Seconds = 30;
let timeInterval;

const parael = document.getElementById("sentence");
const inputel = document.getElementById("input");
const buttonel = document.getElementById("start-btn");
const timerel = document.getElementById("timer");
const speedel = document.getElementById("speed");
const accuracyel = document.getElementById("accuracy");
const resultel = document.getElementById("result");
const retryel = document.getElementById("retry-btn");

function startTest() {
    parael.textContent = paratxt;
    inputel.value = "";
    inputel.disabled = false;
    inputel.focus();
    buttonel.disabled = true;
    timeInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    Seconds--;
    timerel.textContent = `Time Left: ${Seconds}s`;

    if (Seconds <= 0) {
        endTest();
    }
}

buttonel.addEventListener('click', startTest);

function endTest() {
    clearInterval(timeInterval);
    inputel.disabled = true;

    let speed = 0;
    let typeWords = [];
    let correctWords = [];

    const typeSentance = inputel.value.trim();
    const correctSentance = parael.textContent.trim();
    if (typeSentance != "") {
        typeWords = typeSentance.split(" ");
    }
    correctWords = correctSentance.split(" ");

    let correctCount = 0;
    let ind = 0;
    typeWords.forEach((word, index) => {
        if (word === correctWords[index]) {
            correctCount++;
            ind = index;
        }
    });
    const accuracy = (correctCount / correctWords.length) * 100;
    if (typeSentance != "") {
        speed = Math.floor((correctCount / (30 - Seconds)) * 60);
    }
    speedel.textContent = speed;
    accuracyel.textContent = accuracy.toFixed(2);
    resultel.style.display = "block";
    retryel.focus();
}

retryel.addEventListener("click", () => {
    resultel.style.display = "none";
    buttonel.disabled = false;
    inputel.value = "";
    Seconds = 30;
    timerel.textContent = `Time Left: ${Seconds}s`;

});