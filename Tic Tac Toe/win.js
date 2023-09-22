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

const winStreakX = [];
const winStreakO = [];

export function winStreakAdd(player){
    if (player === 'X'){
        winStreakX.push('X');
        winStreakO.length = 0;
        // console.log(`X wins: ${winStreakX.length}`)
    } else {
        winStreakO.push('O');
        winStreakX.length = 0;
        // console.log(`X wins: ${winStreakX.length}`)
    }
}

export function displayWinner(player){
    if (player === 'X'){
        return (winStreakX.length > 1) ? `X has won ${winStreakX.length} times in a row!!`: 'X Wins!'
    } else {
        return (winStreakO.length > 1) ? `O has won ${winStreakO.length} times in a row!!`: 'O Wins!'
    }
}

export function checkWin(player,board = boardLayout,winPatterns = winPattern) {
    for(const pattern of winPattern) {
        const [a, b, c] = pattern;
        const boxA = document.getElementById(`box-${a[0]}-${a[1]}`);
        const boxB = document.getElementById(`box-${b[0]}-${b[1]}`);
        const boxC = document.getElementById(`box-${c[0]}-${c[1]}`);
        
        if (
            board[a[0]][a[1]] === player && 
            board[b[0]][b[1]] === player && 
            board[c[0]][c[1]] === player
            ){
                const winPositions = [a, b, c].map(position => 
                    document.getElementById(`box-${position[0]}-${position[1]}`)
                    )
                
                const allBoxes = document.querySelectorAll('.box');
                allBoxes.forEach((box) => box.classList.remove('win-box'));

                boxA.classList.add('win-box');
                boxB.classList.add('win-box');
                boxC.classList.add('win-box');
                
                let rotationAngle = 0;
            if (pattern.every(([row, col]) => col === pattern[0][1])) {
                // Vertical win
                rotationAngle = 90;
            } else if (pattern.every(([row, col]) => row === pattern[0][0])) {
                // Horizontal win
                rotationAngle = 0;
            } else if (
                pattern.every(([row, col]) => row === col)
            ) {
                // Diagonal right win
                rotationAngle = 45;
            } else if (
                pattern.every(
                    ([row, col]) =>
                        row + col === boardLayout.length - 1
                )
            ) {
                // Diagonal left win
                rotationAngle = -45;
            }

                winPositions.forEach((winBox) => {
                    // const rect = winBox.getBoundingClientRect();
                    // const winner = winPattern[index];

                    const winLine = document.createElement('div');
                    winLine.classList.add('win-line');
    
                    winLine.style.top = `50%`;
                    winLine.style.left = `50%`;
                    winLine.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`
                    if (rotationAngle === 45 || rotationAngle === -45){
                        winLine.style.width = '150%';
                    }
                    winBox.appendChild(winLine);
                });
            return true;
        }
    }
}