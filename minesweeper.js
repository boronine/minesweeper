let canvasElement;
let context;
let minefield = [];

   //Salty memes these days ._.
function initializeGame() {
    canvasElement.width = 200;
    canvasElement.height = 200;

    // INITIALIZE MINEFIELD
    // .........
    // .........

}

function draw() {
    context.fillStyle = 'green';
    context.fillRect(0, 0, 200, 200);
    context.fillStyle = 'red';
    context.strokeStyle = "blue";
    context.strokeRect(0, 0, 10, 10);
    context.fillRect(0, 0, 10, 10);


    // DRAW MINEFIELD
    // .........
    // .........

}

function handleClick(event, isLeftClick) {
    event.preventDefault();
    const canvasRect = canvasElement.getBoundingClientRect();
    const x = Math.round(event.clientX - canvasRect.left);
    const y = Math.round(event.clientY - canvasRect.top);
    console.log('clicked!', x, y, isLeftClick);

    // CHANGE MINEFIELD BASED ON CLICK
    // .........
    // .........

    draw();
}

document.addEventListener('DOMContentLoaded', function () {
    // This is executed when the page is fully loaded

    canvasElement = document.getElementById('main-canvas');
    context = canvasElement.getContext('2d');

    canvasElement.addEventListener("click", function (event) {
        handleClick(event, true);
    });

    canvasElement.addEventListener("contextmenu", function (event) {
        handleClick(event, false);
    });

    initializeGame();
    draw();
});
