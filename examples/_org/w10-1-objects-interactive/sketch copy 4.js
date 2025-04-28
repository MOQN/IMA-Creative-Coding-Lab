let buttons = [];
let sound;

let bgR = 200;
let bgG = 200;
let bgB = 200;

function preload() {
  sound = loadSound("assets/beat.mp3");
  // add more sounds!
}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(bgR, bgG, bgB);

  // generate
  buttons.push(new Button(width / 2, height / 2, random(3, 15), sound));

  // update and display
  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    b.move();
    b.checkMouse();
    b.checkBoundaries();
    b.display();
  }

  // remove if it's done!
  for (let i = buttons.length - 1; i >= 0; i--) {
    // flip the for loop!
    let b = buttons[i];
    if (b.isDone) {
      buttons.splice(i, 1);
    }
  }

  // limit
  while (buttons.length > 500) {
    buttons.splice(0, 1);
  }
}



class Button {
  constructor(x, y, rad, snd) {
    this.x = x;
    this.y = y;
    this.rad = rad;

    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);

    this.r = 255;
    this.g = 255;
    this.b = 255;

    this.sound = snd;
    this.soundRate = random(0.5, 1.5);

    this.isDone = false;
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);

      this.rad += 0.5;

      if (mouseIsPressed) {
        if (this.sound.isPlaying() == false) {
          this.sound.rate(this.soundRate);
          this.sound.play();

          this.rad *= 1.5; // 50%

          bgR = this.r;
          bgG = this.g;
          bgB = this.b;

          this.isDone = true;
        }
      }
    } else {
      // out
      //this.r = 255;
      //this.g = 255;
      //this.b = 255;  // white
    }
  }
  checkBoundaries() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    stroke(this.r, this.g, this.b);
    fill(this.r, this.g, this.b, 100);
    circle(0, 0, this.rad * 2);

    pop();
  }
}
