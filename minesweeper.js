let motivationalQuote = [
    'ion care if i hurt your feelings',
    'imagine playing minesweeper in 2020',
    'Are ya coding son?',
    'Are ya winning son?',
    'I want some hot pockets'
]

const seed = 20; // experimental, not built for current code

let mineList = [];
let mineSize = 20; //must be even cause im lazy, bitch >: (
let mineLimit = 12;
let gameOver = false;
let minesRevealed = false;
let canvasElement;
let ctx;

function renderGame(size) {
    let gameSize = Math.pow(size, 2);
    canvasElement.width = gameSize;
    canvasElement.height = gameSize;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameSize, gameSize);
}

let s = seed;
function getNextRandom() {
    s = (16807 * s) % 2147483947
    return s / 2147483947
}

function getRandomInt(min, max) {
    return Math.floor(getNextRandom() * max) + min;
}

function renderMines(size) {
    let mineX = 0;
    let mineY = 0;
    let mineBoom = null;
    for (let i = 0; i < size / 2; i++) {
        for (let x = 0; x < size / 2; x++) {
            let minePx = size * 2;

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

    var numList = [];
    while(numList.length < mineLimit){
        let num = getRandomInt(0, mineSize * 5)
        if(numList.indexOf(num) === -1) {
            numList.push(num);
        } 
    }

    for (let i = 0; i < mineList.length; i++) {
        for (let x = 0; x < numList.length; x++) {
            if (i == numList[x]) {
                mineList[i].Boom = true;
                break;
            } else if (i != numList[x]) {
                mineList[i].Boom = false;
            }
        }
    }
}

function reloadWeb() {
    location.reload();
    return false;
}

function isPointOverlap(x, y, size) { // apparently you cant return multiple values in js, rip...
    for (let i = 0; i < mineList.length; i++) {
        let xMine = mineList[i].XCoordinate;
        let yMine = mineList[i].YCoordinate;
        if ((x >= xMine + 1 && x <= xMine + size - 1) && (y >= yMine + 1 && y <= yMine + size - 1)) {
            return {vibeCheck:true, indexCheck:i};
        } else if (x < xMine + 1 || x > xMine + size - 1 || y < yMine + 1 || y > yMine + size - 1) {
            continue;
        }

    }
    return {vibeCheck:false};
}

// Render adjacent mine amount text
var nonMines = [];
var execOnce = false;
function getAdjacent(mineTable, index, size) {
    let x = mineTable[index].XCoordinate + 2;
    let y = mineTable[index].YCoordinate + 2;
    let mineAmount = 0;
    // xy coordinate check
    let xNegOffset = x - size + 1;
    let xPosOffset = x + size - 1;
    let yNegOffset = y - size + 1;
    let yPosOffset = y + size - 1;
    let methodArray = [
        isPointOverlap(x, yPosOffset, size), //top
        isPointOverlap(x, yNegOffset, size), //bottom
        isPointOverlap(xNegOffset, y, size), //left
        isPointOverlap(xPosOffset, y, size), //right
        isPointOverlap(xNegOffset, yPosOffset, size), //top left
        isPointOverlap(xPosOffset, yPosOffset, size), //top right
        isPointOverlap(xNegOffset, yNegOffset, size), //bottom left
        isPointOverlap(xPosOffset, yNegOffset, size), //bottom right
    ]

    for (let i = 0; i < methodArray.length; i++) {
        if (methodArray[i].vibeCheck == true && methodArray[i].indexCheck != undefined) {
            if (mineList[methodArray[i].indexCheck].Boom == true) {
                mineAmount += 1;
            }
        }
    }

    if (mineAmount == 0 && nonMines.length == 0) {
        for (let i = 0; i < methodArray.length; i++) {
            if (methodArray[i].vibeCheck == true && methodArray[i].indexCheck != undefined) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(x - 2, y - 2, size, size);
                nonMines.push(mineList[methodArray[i].indexCheck]);
            }
        }
    } else if (mineAmount == 0 && nonMines.length > 0) {
        for (let i = 0; i < methodArray.length; i++) {
            if (methodArray[i].vibeCheck == true && methodArray[i].indexCheck != undefined) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(x - 2, y - 2, size, size);
                let pushTable = false;
                for (let x = 0; x < nonMines.length; x++) {
                    if (nonMines[x] == mineList[methodArray[i].indexCheck]) {
                        pushTable = false;
                        break;
                    } else if (nonMines[x] != mineList[methodArray[i].indexCheck]) {
                        pushTable = true;
                    }
                }

                if (pushTable == true) {
                    nonMines.push(mineList[methodArray[i].indexCheck]);
                }
            }
        }
    } else if (mineAmount > 0 && nonMines.length > 0) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x - 2, y - 2, size, size);
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(mineAmount, x + size / 2 - (size / 6), y + size / 2 + (size / 6));
    }

    if (nonMines.length == 0) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(mineAmount, x + size / 2 - (size / 6), y + size / 2 + (size / 6));
    } else if (nonMines.length > 0 && execOnce == false) {
        execOnce = true;
        getAdjacent(nonMines, 0, size);
    } else if (nonMines.length > 0 && execOnce == true) {
        if (nonMines[index + 1] != undefined) {
            getAdjacent(nonMines, index + 1, size);
        } else if (nonMines[index + 1] == undefined) {
            nonMines = [];
            execOnce = false;
        }
    }
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
            let valueReturn = isPointOverlap(x, y, thiccBox);

            if (valueReturn.vibeCheck == true) {  
                let xCoord = mineList[valueReturn.indexCheck].XCoordinate;
                let yCoord = mineList[valueReturn.indexCheck].YCoordinate;
                
                if (mineList[valueReturn.indexCheck].Boom == true) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(xCoord, yCoord, thiccBox, thiccBox);
                    let flavorText = document.getElementById('motivational');
                    let randomChance = getRandomInt(0, motivationalQuote.length);
                    flavorText.innerHTML = motivationalQuote[randomChance];
                    // setTimeout(reloadWeb, 2000);
                    mineList.splice(valueReturn.indexCheck, 1);

                    for (let i = 0; i < mineList.length; i++) {
                        xCoord = mineList[i].XCoordinate
                        yCoord = mineList[i].YCoordinate
                        if (mineList[i].Boom == false) {
                            ctx.fillStyle = 'blue';
                            ctx.fillRect(xCoord, yCoord, thiccBox, thiccBox);
                        } else if (mineList[i].Boom == true) {
                            ctx.fillStyle = 'red';
                            ctx.fillRect(xCoord, yCoord, thiccBox, thiccBox);
                        }
                    }
                    gameOver = true;
                } else if (mineList[valueReturn.indexCheck].Boom == false) {
                    // Render mine color
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(xCoord, yCoord, thiccBox, thiccBox);

                    getAdjacent(mineList, valueReturn.indexCheck, thiccBox)

                    mineList.splice(valueReturn.indexCheck, 1);
                }
            }
        }
    })

    renderGame(mineSize);
    renderMines(mineSize);
});