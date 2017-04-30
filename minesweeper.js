document.addEventListener('DOMContentLoaded', function () {
    const canvasElement = document.getElementById('main-canvas');
    const context = canvasElement.getContext('2d');
    canvasElement.width = 10;
    canvasElement.height = 10;

    context.fillStyle = 'red';
    context.fillRect(0, 0, 10, 10);

    canvasElement.addEventListener("click", function (event) {
        event.preventDefault();
        const canvasRect = canvasElement.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        console.log('Left click!', x, y);
    });

    canvasElement.addEventListener("contextmenu", function (event) {
        event.preventDefault();
         canvasRect = canvasElement.getBoundingClientRect();
         x = event.clientX - canvasRect.left;
         y = event.clientY - canvasRect.top;
        console.log('Right click!', x, y);
               canvasRect = canvasElement.getBoundingClientRect();
         x = event.clientX - canvasRect.left;
         y = event.clientY - canvasRect.top;
        console.log('Right click!', x, y);   event.preventDefault();

    });
});
