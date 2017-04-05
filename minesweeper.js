document.addEventListener('DOMContentLoaded', function () {
    const canvasElement = document.getElementById('main-canvas');
    const context = canvasElement.getContext('2d');
    canvasElement.width = 200;
    canvasElement.height = 200;

    context.fillStyle = 'green';
    context.fillRect(0, 0, 200, 200);

    canvasElement.addEventListener("click", function (event) {
        event.preventDefault();
        const canvasRect = canvasElement.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        console.log('Left click!', x, y);
    });

    canvasElement.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        console.log('Right click!');
    });
});
