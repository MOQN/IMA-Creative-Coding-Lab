let x = [];
let y = [];
let dia = [];
let xSpeed = [];
let ySpeed = [];
let r = [];
let g = [];
let b = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 1000; i++) {
    x[i] = width / 2;
    y[i] = height / 2;
    dia[i] = random(10, 30);
    xSpeed[i] = random(-3, 3);
    ySpeed[i] = random(-3, 3);
    r[i] = random(255);
    g[i] = random(255);
    b[i] = random(255);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < x.length; i++) {
    // move
    x[i] += xSpeed[i];
    y[i] += ySpeed[i];

    // display
    stroke(r[i], g[i], b[i]);
    fill(r[i], g[i], b[i], 100);
    circle(x[i], y[i], dia[i]);
  }

}