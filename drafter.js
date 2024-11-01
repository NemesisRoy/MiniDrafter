const fabricCanvas = new fabric.Canvas('canvas');
fabricCanvas.setWidth(1200); 
fabricCanvas.setHeight(800); 


const pencilSelect = document.getElementById('pencil-select');

// Mini Drafter Components

// Protractor

const protractor = new fabric.Circle({
    left: 100, // Initial X position
    top: 100, // Initial Y position
    radius: 50, // Size of the protractor circle
    startAngle: Math.PI, // Start angle for half-circle
    endAngle: 2 * Math.PI, // End angle
    stroke: 'black', // Border color
    fill: '', // Transparent fill
    strokeWidth: 2, // Border thickness
});
fabricCanvas.add(protractor);

// Scale 

const scale = new fabric.Rect({
    left: 100, // Initial X position
    top: 150, // Initial Y position
    width: 200, // Length of the scale
    height: 10, // Height of the scale
    fill: 'gray', // Color of the scale
});
fabricCanvas.add(scale);

// Make protractor and scale draggable and rotatable
protractor.set({ selectable: true, hasControls: true, hasBorders: true });
scale.set({ selectable: true, hasControls: true, hasBorders: true });

// Functionality to handle drawing with different pencil types
let isDrawing = false;
let line;

fabricCanvas.on('mouse:down', (options) => {
    isDrawing = true;
    const pointer = fabricCanvas.getPointer(options.e);

    // Start a new line on mouse down
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'black',
        strokeWidth: parseInt(pencilSelect.value), // Adjust line thickness based on pencil selection
    });
    fabricCanvas.add(line);
});

fabricCanvas.on('mouse:move', (options) => {
    if (!isDrawing) return;

    // Update the end coordinates of the line as the mouse moves
    const pointer = fabricCanvas.getPointer(options.e);
    line.set({ x2: pointer.x, y2: pointer.y });
    fabricCanvas.renderAll();
});

fabricCanvas.on('mouse:up', () => {
    isDrawing = false; // Stop drawing on mouse up
});