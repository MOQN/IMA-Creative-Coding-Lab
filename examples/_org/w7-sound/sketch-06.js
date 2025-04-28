let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  mic = new p5.AudioIn();
  mic.start();

  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220, 10);

  let volume = mic.getLevel();

  y += 0.5; // go down
  y -= volume * 15; // move up

  noStroke();
  fill(0, 0, 255);
  circle(x, y, 50);
}