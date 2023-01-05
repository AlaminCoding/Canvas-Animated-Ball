const canvas = document.getElementById("canvas");
canvas.width = screen.availWidth;
canvas.height = document.documentElement.clientHeight - 10;

let h = canvas.height;
let w = canvas.width;

const ctx = canvas.getContext("2d");

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
}

clearCanvas();

let r = 6;
let ballCount = 500;
let speed = 1;

class Player {
  constructor(pos, color) {
    this.pos = pos;
    this.color = color;
  }
  draw() {
    let x = this.pos.x;
    let y = this.pos.y;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

let x = [];
let y = [];
let dx = [];
let dy = [];
color = [];
for (let i = 0; i < ballCount; i++) {
  x.push(Math.floor(Math.random() * (w - r)) + r);
  y.push(Math.floor(Math.random() * (h - r)) + r);
  dx.push(Math.floor(Math.random() * 2) === 0 ? speed : -speed);
  dy.push(Math.floor(Math.random() * 2) === 0 ? speed : -speed);
  color.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

const animate = () => {
  clearCanvas();
  for (let i = 0; i < ballCount; i++) {
    const p = new Player({ x: x[i], y: y[i] }, color[i]);
    p.draw();
    x[i] += dx[i];
    y[i] += dy[i];
    if (y[i] > h - r || y[i] < r) {
      dy[i] = -dy[i];
    }
    if (x[i] > w - r || x[i] < r) {
      dx[i] = -dx[i];
    }
  }
  window.requestAnimationFrame(animate);
};

animate();
