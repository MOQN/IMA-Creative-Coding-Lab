// Demo Interaction: Drag & Drop
let buttons = [];
let draggingButton = null; // currently dragging button
// null means no button is being dragged.

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  background(50);

  for (let i = 0; i < 10; i++) {
    buttons.push(new Button(random(width), random(height), random(20, 30)));
  }
}

function draw() {
  background(50);

  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.checkMouse();
    btn.update();
    btn.display();
  }
}

function mousePressed() {
  for (let i = buttons.length - 1; i >= 0; i--) {
    let btn = buttons[i];
    if (btn.checkMouse()) {
      // if true, this button is "draggingButton"!
      draggingButton = btn;
      break; // stop checking other buttons as we already found the one
    }
  }
}

function mouseReleased() {
  draggingButton = null; // reset dragging button
}

class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
  checkMouse() {
    // this time, we return true or false,
    // so that we can use it in mousePressed() and mouseReleased()
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      this.r = 255;
      this.g = 255;
      this.b = 0;
      if (draggingButton === this) {
        this.r = 255;
        this.g = 0;
        this.b = 0;
      }
      return true; // Yes, mouse is inside!
    } else {
      this.r = 255;
      this.g = 255;
      this.b = 255;
      return false; // No, mouse is outside!
    }
  }
  update() {
    if (draggingButton === this) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2);

    fill(255, 0, 255);
    text(this.id, 0, 0);
    pop();
  }
}