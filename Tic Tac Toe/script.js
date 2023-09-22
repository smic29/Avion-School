import { gameHistory, isTie, clearLayout } from "./gameHistory.js";
import { historyBoard } from "./gameMoves.js";
import { checkWin, winStreakAdd, displayWinner } from "./win.js";
import { isPlaying, xOrO, xChosen, oChosen, doneChoosing } from "./choosePlayer.js";
import { addWinTally, updateTally} from "./winTally.js";

let whoIsPlaying;

function nextTurn() {
    (whoIsPlaying === 0) ? whoIsPlaying = 1 : whoIsPlaying = 0;
}

const boardLayout = [
    ['','',''],
    ['','',''],
    ['','','']
];

const gameMoves = [
    [
        ['','',''],
        ['','',''],
        ['','','']
    ]
];
let latestMove = [0]; 

let isGameActive = true;
function generateBoard(){
    return new Promise((resolve) => {
    const container = document.querySelector('.boardContainer');
    // let isGameActive = true;
    let winMsg = '';

    for (let i=0; i < boardLayout.length; i++){
        for (let j=0; j < boardLayout[i].length; j++){
            const box = document.createElement('div');
            box.classList.add('box');
            ((i+j) % 2 === 0) ? box.classList.add('even') : box.classList.add('odd');
            
            box.addEventListener('click', () => {
                if (!isGameActive) {
                    return;
                }
                if (box.textContent === '') {
                    if (whoIsPlaying === 0) {
                        box.textContent = 'X'
                        box.style.color = '#FF6969'
                        boardLayout[i][j] = 'X'
                    } else {
                        box.textContent = 'O'
                        boardLayout[i][j] = 'O'
                    } 
                        nextTurn(whoIsPlaying);
                        gameHistory(boardLayout,gameMoves,latestMove);
                        isPlaying(whoIsPlaying);
                } else {
                    const alert = document.querySelector('.invalidBox');
                    alert.classList.add('open');
                    document.body.classList.add('choose-open');
                }

                if(checkWin('X',boardLayout) || checkWin('O',boardLayout)) {
                    if(checkWin('X',boardLayout)){
                        winStreakAdd('X');
                        addWinTally('X');
                    } else {
                        winStreakAdd('O');
                        addWinTally('O');
                    }
                    const msgDisplay = document.querySelector('.player')
                    msgDisplay.textContent = `${(checkWin('X',boardLayout)) ? displayWinner('X') : displayWinner('O')}` 
                    msgDisplay.classList.remove('playerX')
                    msgDisplay.classList.remove('playerO')
                    isGameActive = false;
                    resetBtn();
                    historyBoard(gameMoves,latestMove);
                    updateTally();
                }
            })
            box.setAttribute('id', `box-${i}-${j}`);
            container.appendChild(box);
        }
    }
    resolve();
})
}


async function startGame() {
    await generateBoard();
    updateTally();
}


let checkStatus = false;
document.querySelector('.boardContainer').addEventListener('click',() => {
    if (!checkStatus) {
        const tieChecker = setInterval(() => {
            if (isTie(boardLayout) && !(checkWin('X',boardLayout) || checkWin('O',boardLayout))){
                const msgDisplay = document.querySelector('.player')
                msgDisplay.textContent = `GAME OVER: TIE`
                msgDisplay.classList.remove('playerX')
                msgDisplay.classList.remove('playerO')
                clearInterval(tieChecker);
                isGameActive = false;
                historyBoard(gameMoves,latestMove);
                resetBtn();
            }
        },100);

        checkStatus = true;
    }
});

function resetBtn() {
    const reset = document.querySelector('.reset');
    const historyButtons = document.querySelector('.historyBox');
    if (!isGameActive){
        reset.classList.remove('visibility-off');
        reset.classList.add('visibility-on');
        historyButtons.classList.remove('visibility-off');
        historyButtons.classList.add('visibility-on');
    }
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    const boardContainer = document.querySelector('.boardContainer');
    const historyButtons = document.querySelector('.historyBox');
    while (boardContainer.firstChild){
        boardContainer.removeChild(boardContainer.firstChild);
    }
    startGame();
    resetButton.classList.remove('visibility-on');
    resetButton.classList.add('visibility-off');
    historyButtons.classList.remove('visibility-on');
    historyButtons.classList.add('visibility-off');
    checkStatus = false;
    isGameActive = true;
    gameMoves.length = 1;
    clearLayout(boardLayout);
    isPlaying(whoIsPlaying);
})

const xButton = document.querySelector('.playerIsX');
const oButton = document.querySelector('.playerIsO');
const randomButton = document.querySelector('.random');

xButton.addEventListener('click', () => {
    whoIsPlaying = xChosen();
    doneChoosing();
    isPlaying(whoIsPlaying);
})

oButton.addEventListener('click', () => {
    whoIsPlaying = oChosen();
    doneChoosing();
    isPlaying(whoIsPlaying);
})

randomButton.addEventListener('click', ()=> {
    whoIsPlaying = xOrO();
    doneChoosing();
    isPlaying(whoIsPlaying);
})

randomButton.addEventListener('mouseenter',()=> {
    randomButton.classList.add('fa-bounce');
    const icon = document.querySelector('.fa-solid');
    icon.style.color = '#ac3939';
})

randomButton.addEventListener('mouseleave', () => {
    randomButton.classList.remove('fa-bounce');
    const icon = document.querySelector('.fa-solid');
    icon.style.color = ''
})

const invalidMsg = document.querySelector('.invalidBox');

invalidMsg.addEventListener('click', () => {
    invalidMsg.classList.remove('open');
    document.body.classList.remove('choose-open');
})

// const xWins = document.querySelector('.xWinCount');
// const oWins = document.querySelector('.oWinCount');

// xWins.textContent = giveWinTally('X');
// oWins.textContent = giveWinTally('O');

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});