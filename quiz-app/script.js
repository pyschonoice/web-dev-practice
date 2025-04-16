import { quizData } from "./data.js";

const parentDiv = document.getElementById("container");
const questionDiv = document.getElementById("questionDiv");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("options");

let currentQuestionIndex = 0;
let correctAns = 0;
let quizOver = false;


function loadQuestion(){
    const que = quizData[currentQuestionIndex];
    // Smooth fade-out
    parentDiv.classList.add("fade-out");

    setTimeout(() => {
        questionDiv.innerHTML = que.question;

        const options = ['a', 'b', 'c', 'd'];
        const labels = document.querySelectorAll("#options label");

        options.forEach((key, index) => {
            labels[index].innerHTML = `
                <input type="radio" name="opt" value="${key}">
                ${que[key]}
            `;
        });

        // Fade back in
        parentDiv.classList.remove("fade-out");
    }, 50);
}

submitBtn.addEventListener("click", () => {
    if (quizOver) {
        // reload the quiz
        currentQuestionIndex = 0;
        correctAns = 0;
        quizOver = false;
        submitBtn.innerText = "Submit";
        loadQuestion();
    } else {
        submitAns();
    }
});



function submitAns() {
    const que = quizData[currentQuestionIndex];
    const selected = document.querySelector("input[name='opt']:checked");

    if (!selected) {
        alert("Please select an option!");
        return;
    }

    if (selected.value === que.correct) {
        correctAns += 1;
    }

    currentQuestionIndex += 1;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult(); 
    }
}


function showResult() {
    questionDiv.innerHTML = `<h2>You Scored ${correctAns} / ${quizData.length}</h2>`;

    // Clear all options
    const labels = document.querySelectorAll("#options label");
    labels.forEach(label => {
        label.innerHTML = "";
    });

    submitBtn.innerText = "Reload";

    quizOver = true;
}

loadQuestion();
