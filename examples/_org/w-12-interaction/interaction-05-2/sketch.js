// Demo Interaction: World Navigation using Main Character
let worldWidth = 2000;
let worldHeight = 2000;
let worldOffsetX = 0;
let worldOffsetY = 0;

let particles = [];
let character;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(worldWidth), random(worldHeight), random(5, 20)));
  }

  character = new MainCharacter(worldWidth / 2, worldHeight / 2, 20);
}

function draw() {
  // this will be the background of outside world.
  background(220);

  // move main character
  character.followMouse();

  // we only calculate the position of the main character and
  // don't display the main character here.
  // we will display it after the world is drawn!

  // calculate the offset so that the main character stays at center
  worldOffsetX = width / 2 - character.x;
  worldOffsetY = height / 2 - character.y;

  // prevent the world from moving out of the canvas
  // Tip: uncomment the following lines two lines and see what happens! :D
  //worldOffsetX = constrain(worldOffsetX, width - worldWidth, 0);
  //worldOffsetY = constrain(worldOffsetY, height - worldHeight, 0);

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

  // draw main character
  character.display();

  pop(); // world's pop()

  text("The world follows the main character.", 10, 20);
  text("But the main character will follow the mouse!", 10, 40);
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

class MainCharacter {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rotationAngle = 0;
    this.rad = rad;
  }
  followMouse() {
    // get where the mouse points in the world coordinates
    let targetX = mouseX - width / 2 + this.x;
    let targetY = mouseY - height / 2 + this.y;

    // lerp to the target position
    let lerpPercentage = 0.02; // this will determine how fast the main character moves
    this.x = lerp(this.x, targetX, lerpPercentage);
    this.y = lerp(this.y, targetY, lerpPercentage);

    // prevent going outside
    this.x = constrain(this.x, 0, worldWidth);
    this.y = constrain(this.y, 0, worldHeight);
  }
  display() {
    // calculate the direction toward mouse
    let directionX = mouseX - width / 2;
    let directionY = mouseY - height / 2;
    this.rotationAngle = atan2(directionY, directionX);

    push();
    translate(this.x, this.y);
    rotate(this.rotationAngle); // rotate the main character to face the mouse
    noStroke();
    fill(255, 0, 255);
    triangle(
      0, 0,
      this.rad * -2, this.rad * 0.7,
      this.rad * -2, this.rad * -0.7
    );
    pop();
  }
}
