let buttons = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  buttons.push(new Button(width / 2, height / 2, 100));
}

function draw() {
  background(220);

  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    b.checkMouse();
    b.display();
  }
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
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.r = 255;
      this.g = 255;
      this.b = 0;  // yellow
      if (mouseIsPressed) {
        this.r = 255;
        this.g = 0;
        this.b = 0;  // red
      }
    } else {
      // out
      this.r = 255;
      this.g = 255;
      this.b = 255;  // white
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2);

    pop();
  }
}
