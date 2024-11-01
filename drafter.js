const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Drafter state
const drafter = {
  x: 100, 
  y: 100,
  angle: 0,
  armLength: 100,
  isDragging: false
};

// Pencil settings
const pencils = {
  H: { width: 1, color: 'black' },
  '2H': { width: 2, color: '#333' },
  '3H': { width: 3, color: '#666' }
};
let currentPencil = pencils['H'];

// Initialize the canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDrafter();
}

// Draw the drafter with two arms (one fixed, one movable)
function drawDrafter() {
  const arm1End = {
    x: drafter.x + drafter.armLength * Math.cos(drafter.angle),
    y: drafter.y + drafter.armLength * Math.sin(drafter.angle)
  };

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  
  // Draw fixed arm
  ctx.beginPath();
  ctx.moveTo(drafter.x, drafter.y);
  ctx.lineTo(arm1End.x, arm1End.y);
  ctx.stroke();

  // Draw movable arm for angle adjustment
  ctx.beginPath();
  ctx.moveTo(arm1End.x, arm1End.y);
  ctx.lineTo(
    arm1End.x + drafter.armLength * Math.cos(drafter.angle + Math.PI / 4),
    arm1End.y + drafter.armLength * Math.sin(drafter.angle + Math.PI / 4)
  );
  ctx.stroke();
}

// Handling Pencil Type Change
document.getElementById('pencilType').addEventListener('change', (e) => {
  currentPencil = pencils[e.target.value];
});

// Mouse controls for dragging the drafter
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (Math.hypot(mouseX - drafter.x, mouseY - drafter.y) < 20) {
    drafter.isDragging = true;
  } else {
    // Start drawing
    isDrawing = true;
    ctx.strokeStyle = currentPencil.color;
    ctx.lineWidth = currentPencil.width;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (drafter.isDragging) {
    const rect = canvas.getBoundingClientRect();
    drafter.x = e.clientX - rect.left;
    drafter.y = e.clientY - rect.top;
    drawCanvas();
  } else if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  drafter.isDragging = false;
  isDrawing = false;
});

// Reset canvas
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
}

// Initial draw
drawCanvas();
