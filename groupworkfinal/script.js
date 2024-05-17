const questions = [
    {
        question: "Which password is the most secure?",
        answers: [
            {text: "password123", correct: false},
            {text: "ilovecats", correct: false},
            {text: "m#P52s@ap$V", correct: true},
            {text: "qwerty", correct: false},
        ]
    },

    {
        question: "What should you do if someone you don't know sends you a friend request or a message online?",
        answers: [
            {text: "Accept it", correct: false},
            {text: "Ignore it", correct: true},
            {text: "Share personal information with them", correct: false},
            {text: "Block them", correct: false},
        ]
    },

    {
        question: "What should you do if you receive an email asking for your password or personal information?",
        answers: [
            {text: "Reply with the information", correct: false},
            {text: "Report it as suspicious and don't respond", correct: true},
            {text: "Share the information with a friend", correct: false},
            {text: "Ask for more details", correct: false},
        ]
    },

    {
        question: "It's safe to share your password with your best friends",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
            {text: "It's okay if they promise not to tell anyone", correct: false},
            {text: "It depends on how much you trust them", correct: false},
        ]
    },

    {
        question: "Which of these should you NOT share online?",
        answers: [
            {text: "Your home address", correct: false},
            {text: "Your school's name", correct: false},
            {text: "Your bank details", correct: false},
            {text: "All of the above", correct: true},
        ]
    }

    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);


    })
}



function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


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
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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




nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();

