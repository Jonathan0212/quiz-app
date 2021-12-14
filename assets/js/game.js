const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');



let currentQuestion = {};
let acceptingAnswers= true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];


// questions
let questions = [
    {
        question: 'In Star Wars Revenge of the Sith, who was Palpatine future apprentice?',
        choice1: 'Luke Skywalker',
        choice2: 'Obi Wan Kenobi',
        choice3: 'Anakin Skywalker',
        choice4: 'Greedo',
        answer: 3,

    },
    {
        question: 'In Episode I, who was the Sith Lord?',
        choice1: 'Yoda',
        choice2: 'Chewbacca',
        choice3: 'Darth Sidious',
        choice4: 'Darth Maul',
        answer: 4,

    },
    {
        question: 'During Episode 2 Attack of the Clones, what planet did all the cloning take place at?',
        choice1: 'Kamino',
        choice2: 'Tattoine',
        choice3: 'Hoth',
        choice4: 'Mustafar',
        answer: 1,

    },
    {
        question: 'What Star Wars movie is the best one?',
        choice1: 'Episode 9 Rise of Skywalker',
        choice2: 'Episode 3 Revenge of the Sith',
        choice3: 'Episode 6 Return of the Jedi',
        choice4: 'Episode 4 A New Hope',
        answer: 2,

    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0;
    avaliableQuestions = [...questions];
    getNewQuestion()
}

getNewQuestion = () => {
    if(avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS || time === 0) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/endquiz.html')
    }

    questionCounter++
    progressText.innerText ='Question ${questionCounter} of ${MAX_QUESTIONS}'

    const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length)
    currentQuestion = avaliableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    avaliableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers =  false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    score.Text.innerText =  score;
};

startGame();