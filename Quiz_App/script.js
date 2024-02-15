const questions = [
    {
        question: "What is the value of (3^2 + 4^2) / (5^2 - 2^2)?",
        answers:[
            {text: "2", correct: false},
            {text: "6", correct: false},
            {text: "3", correct: true},
            {text: "9", correct: false},
        ]
    },
    {
        question: "If a number is increased by 20% and then decreased by 10%, what is the net percentage change?",
        answers:[
            {text: "2%", correct: false},
            {text: "6%", correct: false},
            {text: "10%", correct: false},
            {text: "8%", correct: true},
        ]
    },
    {
        question: "A train travels 300 km in 4 hours. What is its speed in km/hr?",
        answers:[
            {text: "90", correct: false},
            {text: "60", correct: false},
            {text: "80", correct: false},
            {text: "75", correct: true},
        ]
    },
    {
        question: "If the product of two consecutive even integers is 1680, what are the integers?",
        answers:[
            {text: "16,18", correct: false},
            {text: "20,22", correct: false},
            {text: "24,26", correct: true},
            {text: "14,16", correct: false},
        ]
    },
    {
        question: "What is the missing number in the series: 2, 5, 10, ?, 50, 101?",
        answers:[
            {text: "15", correct: false},
            {text: "20", correct: true},
            {text: "25", correct: false},
            {text: "22", correct: false},
        ]
    },
    {
        question: "If today is Wednesday, what day will it be after 100 days?",
        answers:[
            {text: "Saturday", correct: true},
            {text: "Sunday", correct: false},
            {text: "Monday", correct: false},
            {text: "Tuesday", correct: false},
        ]
    },
    {
        question: " If the perimeter of a rectangle is 36 cm and its length is 10 cm, what is its width?",
        answers:[
            {text: "8 cm", correct: true},
            {text: "7 cm", correct: false},
            {text: "9 cm", correct: false},
            {text: "6 cm", correct: false},
        ]
    },
    {
        question: "If x + 3 = 8, what is the value of x?",
        answers:[
            {text: "2", correct: false},
            {text: "6", correct: false},
            {text: "5", correct: true},
            {text: "9", correct: false},
        ]
    },
    {
        question: "What is the square root of 144?",
        answers:[
            {text: "10", correct: false},
            {text: "12", correct: true},
            {text: "14", correct: false},
            {text: "16", correct: false},
        ]
    },
    {
        question: "In a group of 80 students, 40 play football, 30 play cricket, and 10 play both football and cricket. How many students play only cricket?",
        answers:[
            {text: "20", correct: true},
            {text: "25", correct: false},
            {text: "30", correct: false},
            {text: "35", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document. createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
};


function showScore(){
    resetState();
    questionElement.innerHTML  = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();

