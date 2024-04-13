const questionsData = [
    {
        "title": "Quanto é 10 + 20?",
        "answers": [
            { 
                "alternative": "40", 
                "isCorrect": false 
            },
            { 
                "alternative": "30", 
                "isCorrect": true 
            },
            { 
                "alternative": "60", 
                "isCorrect": false 
            },
            { 
                "alternative": "70", 
                "isCorrect": false 
            },
            { 
                "alternative": "80", 
                "isCorrect": false 
            }
        ]
    },
    {
        "title": "Quanto é 100 + 15?",
        "answers": [
            { 
                "alternative": "115", 
                "isCorrect": true 
            },
            { 
                "alternative": "125", 
                "isCorrect": false 
            },
            { 
                "alternative": "105", 
                "isCorrect": false 
            },
            { 
                "alternative": "120", 
                "isCorrect": false 
            },
            { 
                "alternative": "130", 
                "isCorrect": false 
            }
        ]
    },
    {
        "title": "Quanto é 90 - 25?",
        "answers": [
            { 
                "alternative": "45", 
                "isCorrect": false 
            },
            { 
                "alternative": "75", 
                "isCorrect": false 
            },
            { 
                "alternative": "85", 
                "isCorrect": false 
            },
            { 
                "alternative": "60", 
                "isCorrect": false 
            },
            { 
                "alternative": "65", 
                "isCorrect": true 
            }
        ]
    },
    {
        "title": "Quanto é 21 - 3?",
        "answers": [
            { 
                "alternative": "16", 
                "isCorrect": false 
            },
            { 
                "alternative": "15", 
                "isCorrect": false 
            },
            { 
                "alternative": "17", 
                "isCorrect": false 
            },
            { 
                "alternative": "19", 
                "isCorrect": false 
            },
            { 
                "alternative": "18", 
                "isCorrect": true 
            }
        ]
    },
    {
        "title": "Quanto é 500 - 150?",
        "answers": [
            { 
                "alternative": "450", 
                "isCorrect": false 
            },
            { 
                "alternative": "650", 
                "isCorrect": false 
            },
            { 
                "alternative": "350", 
                "isCorrect": true 
            },
            { 
                "alternative": "250", 
                "isCorrect": false 
            },
            { 
                "alternative": "550", 
                "isCorrect": false 
            }
        ]
    }
]

const quizContainer = document.querySelector("#quiz-container");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const feedback = document.querySelector(".feedback");
const totalPoints = document.querySelector(".points");
const nextButton = document.querySelector(".next-question");

let questionIndex = 0;
let score = 0;
let questionAnswered = false;

nextButton.addEventListener("click", showNextQuestion);

function showNextQuestion () {
    questionAnswered = false;
    feedback.textContent = "";

    if (questionIndex < questionsData.length - 1) {
        questionIndex++;
        showQuestion();
    }else{
        finishQuiz();
    }
}

function finishQuiz () {
    question.classList.add("hide");
    answersContainer.classList.add("hide");
    feedback.classList.add("hide");
    nextButton.classList.add("hide");

    const span = document.createElement("span");
    span.classList.add("end-quiz");
    span.textContent = `
        Parabéns!
        Você concluiu todas as perguntas.
    `
    quizContainer.appendChild(span);
}

function showFeedback (event) {
    if (questionAnswered) return;

    let isCorrectAnswer = event.target.getAttribute("data-correct");
    
    if (isCorrectAnswer === "false") {
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        feedback.textContent = "Resposta incorreta";

        questionAnswered = true;
        disableAlternatives();
        
        return false;
    }
    
    feedback.classList.remove("incorrect");
    feedback.classList.add("correct");
    feedback.textContent = "Resposta correta";
    
    let rightAnswer = true;
    showScore(rightAnswer, questionAnswered);
    questionAnswered = true;
    disableAlternatives()
    
    return true;
    
}

function showScore (isCorrect, questionAnswered) {

    const pointsEarned = 1;

    if (isCorrect && !questionAnswered) {
        score = score + pointsEarned;
        totalPoints.textContent = `${score} ponto(s)`;

        return true;
    }

    return totalPoints.textContent = `${score} ponto(s)`;
}

function disableAlternatives() {
    const alternatives = document.querySelectorAll(".alternative");
    alternatives.forEach(alternative => {
        alternative.removeEventListener("click", showFeedback);
        alternative.classList.remove("alternative");
        alternative.classList.add("disabled");
    });
}

function showQuestion () {
    const currentQuestion = questionsData[questionIndex];
    answersContainer.innerHTML = "";
    question.innerHTML = currentQuestion.title;

    currentQuestion.answers.forEach(item => {
        const span = document.createElement("span");
        
        span.classList.add("alternative");
        span.setAttribute("data-correct",item.isCorrect);
        span.setAttribute("tabindex","0");        
        span.innerHTML = item.alternative;
        
        answersContainer.appendChild(span);

    });

        const alternatives = document.querySelectorAll(".alternative");

        alternatives.forEach(item => {
            item.addEventListener("click", showFeedback);
            item.addEventListener("focus", () => item.classList.add("alternative-focus"));
            item.addEventListener("blur", () => item.classList.remove("alternative-focus"));
        })
}

showQuestion();
showScore(score);