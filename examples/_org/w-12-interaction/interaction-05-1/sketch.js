// Demo Interaction: World Navigation using Dragging + Limit World Offset
let worldWidth = 2000;
let worldHeight = 2000;
let worldOffsetX = 0;
let worldOffsetY = 0;

let startMouseX = 0;
let startMouseY = 0;
let startOffsetX = 0;
let startOffsetY = 0;

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(worldWidth), random(worldHeight), random(5, 20)));
  }
}

function draw() {
  // this will work as a background of outside world
  background(220);

  push(); // world's push()
  translate(worldOffsetX, worldOffsetY);

  // draw the world background
  noStroke();
  fill(200, 255, 255);
  rect(0, 0, worldWidth, worldHeight);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.reappear();
    p.display();
  }

  pop(); // world's pop()

  text("Drag to move around the world!", 10, 20);
}

function mousePressed() {
  // store the mouse position and world offset
  // so that we can calculate the change in mouse position when dragging
  startMouseX = mouseX;
  startMouseY = mouseY;
  startOffsetX = worldOffsetX;
  startOffsetY = worldOffsetY;
}

function mouseDragged() {
  // calculate the change in mouse position
  let changeX = mouseX - startMouseX;
  let changeY = mouseY - startMouseY;
  // the get tentative new offset, but not update yet!
  let newOffsetX = startOffsetX + changeX;
  let newOffsetY = startOffsetY + changeY;

  // calculate where the current center is;
  let centerX = -newOffsetX + width / 2;
  let centerY = -newOffsetY + height / 2;
  // then, only update if center is inside the world!
  if (centerX > 0 && centerX < worldWidth && centerY > 0 && centerY < worldHeight) {
    worldOffsetX = newOffsetX;
    worldOffsetY = newOffsetY;
  }
}

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
    this.rad = rad;
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  reappear() {
    if (this.x < 0) this.x = worldWidth;
    if (this.x > worldWidth) this.x = 0;
    if (this.y < 0) this.y = worldHeight;
    if (this.y > worldHeight) this.y = 0;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(100, 150, 200);
    noStroke();
    circle(0, 0, this.rad * 2);
    pop();
  }
}
