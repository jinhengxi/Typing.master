const GAME_TIME = 3;
let score = 0;
let time = GAME_TIME;
let isplaying = false;
let timeInterval
let checkInterval
let words = []

const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const scoreDisplay = document.querySelector('.score')
const timeDisplay = document.querySelector('.time')
const button = document.querySelector('.button')

init()

function init(){
    getWords()
    wordInput.addEventListener('input', checkMatch);
}
//게임 실행
function run(){
    isplaying = true;
    time = GAME_TIME;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus,50);
    buttonChange('게임중');
}

function checkStatus(){
    if(!isplaying && time === 0){
        alert('게임종료');
        buttonChange('게임시작');
        clearInterval(checkInterval);
    }
}

//단어 불러오기
function getWords(){
    words = ['Hello', 'Banana', 'Apple', 'Cherry'];
    buttonChange('게임시작')
}

//단어 일치 체크
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = '';
        if(!isplaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

function countDown(){
    time > 0
    ?time--
    :isplaying = false;
    if(!isplaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}


function buttonChange(text){
    button.innerText = text;
    text === '게임시작'
    ? button.classList.remove('loading')
    : button.classList.add('loading')
}
