// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 50;
// Setup our canvas for drawing
// make a variable called height and width from the same properties on our canvas.
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
// create random x and y starting points on the canvas

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 40;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function strokeCanvas(adjustX, adjustY) {
  if (
    x + adjustX >= width ||
    x + adjustX <= 0 ||
    y + adjustY >= height ||
    y + adjustY <= 0
  ) {
    return;
  }

  ctx.beginPath(); // start the drawing
  ctx.strokeStyle = `hsl(${(hue += 1)}, 100%, 50%)`;
  ctx.moveTo(x, y);

  x += adjustX;
  y += adjustY;

  ctx.lineTo(x, y);
  // handle trying to draw over the edge of the page
  ctx.stroke();
}

// write a handler for the keys
function strokeCanvasForDrawingKeys(e) {
  switch (e.key) {
    case 'ArrowUp':
      strokeCanvas(0, -MOVE_AMOUNT);
      break;
    case 'ArrowRight':
      strokeCanvas(MOVE_AMOUNT, 0);
      break;
    case 'ArrowDown':
      strokeCanvas(0, MOVE_AMOUNT);
      break;
    case 'ArrowLeft':
      strokeCanvas(-MOVE_AMOUNT, 0);
      break;
    default:
  }
}

// listen for arrow keys
document.addEventListener('keydown', strokeCanvasForDrawingKeys);

document
  .querySelector('.shake')
  .addEventListener('click', () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  );
