
let angle = 0;
let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220, 10);

  let volume = mic.getLevel();

  let rotSpeed = map(volume, 0, 1, 0, 0.6);
  angle += rotSpeed;

  let radDist = 200;
  let x = cos(angle) * radDist;
  let y = sin(angle) * radDist;

  push();
  translate(width / 2, height / 2);
  noStroke();
  fill(0, 0, 255);
  circle(x, y, 50);
  pop();
}