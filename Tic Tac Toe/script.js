import { gameHistory, isTie, clearLayout } from "./gameHistory.js";
import { historyBoard } from "./gameMoves.js";

// gameHistory();

function xOrO() {
    const num = Math.round(Math.random() + 1);
    return num;
}

let whoIsPlaying = xOrO();

function nextTurn() {
    (whoIsPlaying === 0) ? whoIsPlaying = 1 : whoIsPlaying = 0;
}

function isPlaying() {
    const msg = " IS PLAYING";
    const msgDisplay = document.querySelector('.player');

    (whoIsPlaying === 0) ? msgDisplay.textContent = `X${msg}`: msgDisplay.textContent = `O${msg}`;
}

const boardLayout = [
    ['','',''],
    ['','',''],
    ['','','']
];
const winPattern = [];
// Row Patterns
for (let i = 0; i < boardLayout.length; i++){
    const row = [];
    for (let j = 0; j < boardLayout.length; j++){
        row.push([i,j]);
    }
    winPattern.push(row);
}
// Column Patterns
for (let i = 0; i < boardLayout.length; i++){
    const col = [];
    for (let j = 0; j < boardLayout.length; j++){
        col.push([j,i]);
    }
    winPattern.push(col);
}
// Diagonal Patterns
const diag1 = [];
const diag2 = [];
for (let i = 0; i < boardLayout.length; i++){
    diag1.push([i,i]);
    diag2.push([i, boardLayout.length - i - 1]);
}
winPattern.push(diag1);
winPattern.push(diag2);
// Check Array
// console.log(winPattern);

function checkWin(player) {
    const msgDisplay = document.querySelector('.player')
    for(const pattern of winPattern) {
        const [a, b, c] = pattern;
        if (boardLayout[a[0]][a[1]] === player && boardLayout[b[0]][b[1]] === player && boardLayout[c[0]][c[1]] === player){
            return true;
        }
    }
}

const gameMoves = [];
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
                        box.style.color = 'black'
                        boardLayout[i][j] = 'X'
                        // if (checkWin('X')) {
                        //     isGameActive = false;
                        //     winMsg = 'X WINS!'
                        // }
                    } else {
                        box.textContent = 'O'
                        boardLayout[i][j] = 'O'
                        // if (checkWin('O')) {
                        //     winMsg = 'O WINS!';
                        //     isGameActive = false;   
                        // } 
                    } 
                        nextTurn();
                        gameHistory(boardLayout,gameMoves,latestMove);
                        // console.log(gameMoves);
                        // console.log(isTie(boardLayout))
                        isPlaying();
                        // console.log(boardLayout)
                } else {
                    alert('Invalid Move');
                }

                if(checkWin('X') || checkWin('O')) {
                    const msgDisplay = document.querySelector('.player')
                    msgDisplay.textContent = `${(checkWin('X')) ? 'X' : 'O'} Wins!` 
                    isGameActive = false;
                    // console.log(gameMoves);
                    resetBtn();
                    historyBoard(gameMoves,latestMove);
                }
            })
            container.appendChild(box);
            // console.log(i+j);
        }
    }
    resolve();
})

// Reference of what I tried first:
    // boardLayout.forEach((square) => {
    //     square.forEach((dot) => {
    //         const box = document.createElement('div');
    //         box.classList.add('box');
    //         container.appendChild(box);
    //     })
    // })

}


async function startGame() {
    await generateBoard();
}


let checkStatus = false;
document.querySelector('.boardContainer').addEventListener('click',() => {
    if (!checkStatus) {
        const tieChecker = setInterval(() => {
            if (isTie(boardLayout) && !(checkWin('X') || checkWin('O'))){
                // alert ('No moves left. TIE GAME');
                const msgDisplay = document.querySelector('.player')
                msgDisplay.textContent = `GAME OVER: TIE`
                clearInterval(tieChecker);
                isGameActive = false;
                // console.log(isGameActive);
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
        // console.log('Im being run through');
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
    gameMoves.length = 0;
    clearLayout(boardLayout);
    isPlaying();
})

document.addEventListener('DOMContentLoaded', () => {
    isPlaying();
    startGame();  
});

// document.addEventListener('click',() => {
//     nextTurn();
//     isPlaying();
// })