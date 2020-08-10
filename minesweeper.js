let motivationalQuote = [
    'get fucked pussy!',
    'ion care if i hurt your feelings',
    'imagine playing minesweeper in 2020',
    'Are ya coding son?',
    'Are ya winning son?',
    'I want some hot pockets'
]
let mineList = [];
let gameOver = false;
let canvasElement;
let ctx;

function renderGame(size) {
    let gameSize = Math.pow(size, 2);
    canvasElement.width = gameSize;
    canvasElement.height = gameSize;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameSize, gameSize);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function renderMines(size) {
    let mineX = 0;
    let mineY = 0;
    let mineBoom;
    for (let i = 0; i < size / 2; i++) {
        for (let i = 0; i < size / 2; i++) {
            let minePx = size * 2;
            let randomChance = getRandomInt(1, 2)
            if (randomChance == 1) {
                mineBoom = true;                
            } else if (randomChance == 2) {
                mineBoom = false;
            }
            ctx.strokeStyle = "blue";
            ctx.strokeRect(mineX, mineY, minePx, minePx);
            ctx.fillStyle = 'green';
            ctx.fillRect(mineX, mineY, minePx, minePx)
            mineList.push({XCoordinate:mineX, YCoordinate:mineY, Boom:mineBoom});
            mineX += size * 2;            
        }
        mineX = 0;
        mineY += size * 2;
    }
}

function reloadWeb() {
    location.reload();
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    canvasElement = document.getElementById('main-canvas')
    ctx = canvasElement.getContext('2d')

    canvasElement.addEventListener('click', function() {
        let canvasRect = canvasElement.getBoundingClientRect();
        let x = Math.round(event.clientX - canvasRect.left);
        let y = Math.round(event.clientY - canvasRect.top);
        
        /*
            Assuming x = 3, y = 7 how would we find if the first box was clicked?
            Keeping in mind that the size of the box is mineSize * 2
        */
        let thiccBox = mineSize * 2
        if (gameOver == false) {
            for (let i = 0; i < mineList.length; i++) {
                if ((x >= mineList[i].XCoordinate + 1 && x <= mineList[i].XCoordinate + (mineSize * 2) - 1) && (y >= mineList[i].YCoordinate + 1 && y <= mineList[i].YCoordinate + (mineSize * 2) - 1)) {               
                    if (mineList[i].Boom == true) {
                        ctx.fillStyle = 'red';
                        ctx.fillRect(mineList[i].XCoordinate, mineList[i].YCoordinate, thiccBox, thiccBox);
                        let flavorText = document.getElementById('motivational');
                        let randomChance = getRandomInt(0, motivationalQuote.length);
                        flavorText.innerHTML = motivationalQuote[randomChance];
                        setTimeout(reloadWeb, 2000)
                        gameOver = true;
                    } else if (mineList[i].Boom == false) {
                        ctx.fillStyle = 'blue';
                        ctx.fillRect(mineList[i].XCoordinate, mineList[i].YCoordinate, thiccBox, thiccBox)
                    }
                }
            }
        }
    })
    let mineSize = 20; //must be even cause im lazy, bitch >: (
    renderGame(mineSize);
    renderMines(mineSize);
});