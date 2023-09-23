export function isPlaying(playerVariable) {
    const msg = " IS PLAYING";
    const msgDisplay = document.querySelector('.player');

    if(playerVariable === 0) { 
        msgDisplay.textContent = `X${msg}`
        msgDisplay.classList.add('playerX');
        msgDisplay.classList.remove('playerO');
    } else {
        msgDisplay.textContent = `O${msg}`;
        msgDisplay.classList.add('playerO');
        msgDisplay.classList.remove('playerX');
    }
}

export function xOrO() {
    const num = Math.round(Math.random());
    return num;
}

export function xChosen() {
    return 0;
}

export function oChosen() {
    return 1;
}

export function doneChoosing(){
    const modal = document.querySelector('.choosePlayer');
    const body = document.body;

    modal.classList.add('offDisplay');
    // modal.style.display = 'none';
    body.classList.remove('choose-open');
}