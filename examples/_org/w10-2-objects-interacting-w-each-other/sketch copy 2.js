let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  particles.push(new Particle(200, 150, 100));
  particles.push(new Particle(600, 150, 70));
  particles.push(new Particle(600, 350, 50));

}

function draw() {
  background(220);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.checkMouse();

    for (let otherIndex = 0; otherIndex < particles.length; otherIndex++) {
      let anotherP = particles[otherIndex];
      // one simple method is
      // if their indices are the same!
      // if (i == otherIndex) { // }

      // if this p is not same as anotherP (itself), check collision!
      if (p != anotherP) {
        p.checkOther(anotherP);
      }
    }

    p.display();
  }
}

//

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.clr = color(255, 255, 255); // white
  }
  checkOther(other) {
    // receive other particle's reference
    // you can access all properties and methods(functions)!

    let distance = dist(this.x, this.y, other.x, other.y);
    if (distance < this.rad + other.rad) {
      // collided!
      this.clr = color(0, 255, 0); // green
    } else {
      // don't do anything
    }
  }
  checkMouse() {
    // don't use style functions here!
    // change properties here!
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.clr = color(255, 255, 0); // yellow
      if (mouseIsPressed) {
        this.clr = color("coral"); // yellow

        // move randomly
        //this.x += random(-1, 1);
        //this.y += random(-1, 1);

        // drag
        this.x = mouseX;
        this.y = mouseY;
      }
    } else {
      // out
      this.clr = color(255, 255, 255); // white
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(this.clr);
    noStroke();
    strokeWeight(1);
    circle(0, 0, this.rad * 2);

    pop();
  }
}