export function gameHistory(currentLayout, historyVariable,latestMove) {
    const boardCopy = [];

    for (let i = 0; i < currentLayout.length; i++){
        const row = [];
        for (let j = 0; j < currentLayout[i].length; j++){
            row.push(currentLayout[i][j]);
        }
        boardCopy.push(row);
    }
    historyVariable.push(boardCopy);
    latestMove[0] = historyVariable.length - 1;
}

export function isTie(currentLayout) {
    for (let i = 0; i < currentLayout.length; i++){
        const rows = currentLayout[i];
        for (let j = 0; j < rows.length; j++){
            if (rows[j] === ''){
                return false;
            }
        }
    }
    return true;
}

export function clearLayout(currentLayout) {
    for (let i = 0; i < currentLayout.length; i++){
        const rows = currentLayout[i];
        for (let j=0; j < rows.length; j++){
            rows[j] = '';
        }
    }
}


//Thought process on saving the current state of the board on each 
//click

// const moveSet = [];

// moveSet.push([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ])
// console.log(moveSet)