const GAME_TIME = 5;
let score = 0;
let time = GAME_TIME;
let isplaying = false;
let timeInterval;
let checkInterval;
let words = []


const wordDisplay = document.querySelector('.word-display');
const wordInput = document.querySelector('.word-input');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init()

function init(){
    buttonChange('버튼로딩중...')
    getWords()
    wordInput.addEventListener('input',checkMatch);
}

function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then((response)=>{
        response.data.forEach((word)=>{
            if(word.length < 10){
                words.push(word);
            }
        })
        buttonChange('게임시작');
    })
    .catch((error)=>{
        console.log(error);
    })
}

function run(){
    if(isplaying){
        return;
    }
    isplaying = true;
    wordInput.focus();
    time = GAME_TIME;
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown,1000);
    checkInterval =  setInterval(checkStatus,50);
    buttonChange('게임중');
}

function checkStatus(){
    if(!isplaying && time === 0){
        alert(scoreDisplay.innerText + '점입니다.');
        buttonChange('게임시작');
        clearInterval(checkInterval);
    }
}


function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = '';
        if(!isplaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length)
        wordDisplay.innerText = words[randomIndex];
    }}


function countDown(){
    time > 0
    ? time--
    : isplaying = false;
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