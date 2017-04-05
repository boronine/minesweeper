function main() {
    const canvasElement = document.getElementById('main-canvas');
    canvasElement.width = 200;
    canvasElement.height = 200;
    const context = canvasElement.getContext('2d');
    context.fillStyle = 'green';
    context.fillRect(0, 0, 200, 200);
}

document.addEventListener('DOMContentLoaded', main);
