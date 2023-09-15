export function historyBoard(gameMoves,moveIndex){
    // let latestMove = (gameMoves.length - 1 < 0) ? 0 : gameMoves.length - 1;
    let latestMove = moveIndex[0];
    // console.log(gameMoves.length);
    // console.log(latestMove);
    // console.log(latestMove > 0)
    console.log(latestMove < gameMoves.length - 1)
    const gameBoard = document.querySelector('.boardContainer');
    while (gameBoard.firstChild){
        gameBoard.removeChild(gameBoard.firstChild);
    }
    // console.log(`latestMove here is: ${latestMove}`);
    function next(){
        if(latestMove < gameMoves.length - 1){
            // console.log(latestMove)
            latestMove++;
            // console.log(latestMove);
            boardCleanse();
            historyBoardGenerator(gameMoves,latestMove,gameBoard);
            buttonStatus();
        }
    }
// Event Listeners had to be here since putting them in index.js would
// cause them to read the initializer(latestMove) from the previous
// board generation (in this case, the first gameMove.length = 0) after
// a win.
    const nextButton = document.querySelector('.next');
    nextButton.addEventListener('click',() => {
        next();
    });

    function prev(){
        if(latestMove > 0){
            // console.log(gameMoves.length)
            latestMove--;
            // console.log(latestMove);
            boardCleanse();
            historyBoardGenerator(gameMoves,latestMove,gameBoard);
            buttonStatus();
        }
    }

    const prevButton = document.querySelector('.previous');
    prevButton.addEventListener('click',() => {
        prev();
    })

    function buttonStatus(){
        if (latestMove === gameMoves.length - 1){
            nextButton.classList.add('disabled-button');
        } else {
            nextButton.classList.remove('disabled-button');
        }

        if (latestMove === 0){
            prevButton.classList.add('disabled-button');
        } else {
            prevButton.classList.remove('disabled-button');
        }
    }

    if (gameMoves.length === 0 || latestMove < 0 || latestMove >= gameMoves.length) {
        return {
          next,
          prev,
        };
      }
    historyBoardGenerator(gameMoves,latestMove,gameBoard);
    buttonStatus();
    setTimeout(displayMessage(),2000);
    
    return {
        next,
        prev,
    }
}

function historyBoardGenerator(gameMoves,latestMove,gameBoard){
    const moveSet = gameMoves[latestMove];
        for (let j = 0; j < moveSet.length; j++){
            const row = moveSet[j];
            for (let k = 0; k < row.length; k++){
                const box = document.createElement('div');
                box.classList.add('box');
                ((j+k) % 2 === 0) ? box.classList.add('even') : box.classList.add('odd');

                if (row[k] === 'X'){
                    box.textContent = 'X';
                    box.style.color = 'black'
                } else if (row[k] === 'O') {
                    box.textContent = 'O';
                } else {
                    box.textContent = '';
                }

                gameBoard.appendChild(box);
            }
        }

}

function boardCleanse() {
    const gameBoard = document.querySelector('.boardContainer');
    while (gameBoard.firstChild){
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function displayMessage() {
    const parentContainer = document.querySelector('.player');
    const displayHistoryMsg = document.createElement('span');

    displayHistoryMsg.textContent = `You are currently viewing the game history`,2000;
    parentContainer.appendChild(displayHistoryMsg);
}

