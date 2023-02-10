const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let scale = 1;

// Read the text file and draw the points
async function drawPoints() {
  // Read the text file
  const response = await fetch('data.txt');
  const data = await response.text();
  
  // Split the data into lines
  const lines = data.split('\n');
  
  // Draw the points
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(scale, scale);
  for (const line of lines) {
    const point = line.split(',');
    if (point.length !== 5) {
      continue;
    }
    
    const x = parseInt(point[0]);
    const y = parseInt(point[1]);
    const r = parseInt(point[2]);
    const g = parseInt(point[3]);
    const b = parseInt(point[4]);
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, y, 10, 10);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// Call the function to draw the points
drawPoints();

// Set up a timer to call the function every 2 seconds
setInterval(drawPoints, 2000);

// Handle zoom in/out events
canvas.addEventListener('wheel', (event) => {
  event.preventDefault();
  const delta = event.deltaY < 0 ? 1.1 : 0.9;
  scale *= delta;
  drawPoints();
});
