const xWinTally = [];
const oWinTally = [];

export function addWinTally(player){
    (player === 'X') ? xWinTally.push('X') : oWinTally.push('O');
}

export function giveWinTally(player){
    return (player === 'X') ? xWinTally.length : oWinTally.length;
}

export function updateTally(){
    const xWins = document.querySelector('.xWinCount');
    const oWins = document.querySelector('.oWinCount');

    xWins.textContent = giveWinTally('X');
    oWins.textContent = giveWinTally('O');
}