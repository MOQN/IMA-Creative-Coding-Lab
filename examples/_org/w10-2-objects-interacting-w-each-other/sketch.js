let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(random(width), random(height), random(3, 30)));
  }
}

function draw() {
  background(220);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.move();
    p.reappear();

    //p.checkMouse();

    for (let otherIndex = 0; otherIndex < particles.length; otherIndex++) {
      let anotherP = particles[otherIndex];

      //p.checkOther(anotherP);
      p.showConnection(anotherP);

    }

    p.display();
  }

  // to remove!
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone) {
      particles.splice(i, 1);
    }
  }

  text(particles.length, 10, 20);
}


//

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    //
    this.clr = color(255, 255, 255); // white
    //
    this.isDone = false;
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  reappear() {
    if (this.x < 0) {
      this.x = width;
    }
    else if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    else if (this.y > height) {
      this.y = 0;
    }
  }
  checkOther(other) {
    if (this != other) {
      let distance = dist(this.x, this.y, other.x, other.y);
      if (distance < this.rad + other.rad) {
        // collided!
        if (this.rad > other.rad) {
          this.rad += other.rad;
          other.isDone = true;
        }
        else if (this.rad < other.rad) {
          other.rad += this.rad;
          this.isDone = true;
        } else {
          //
        }

      } else {
        // don't do anything
      }
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
  showConnection(other) {
    if (this != other) {
      push();
      let d = dist(this.x, this.y, other.x, other.y);
      if (d < 100) {
        let sw = map(d, 0, 100, 5, 0, true);
        strokeWeight(sw);
        line(this.x, this.y, other.x, other.y);
      }

      pop();
    }




  }
}