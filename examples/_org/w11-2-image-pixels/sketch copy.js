let cam;

let clr;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");

  cam = createCapture(VIDEO);
  cam.hide();

  background(255);

  clr = color(255, 255, 255); // white
}

function draw() {
  //background(220);

  //tint(255, 0, 255);
  //image(cam, 0, 0);

  for (let i = 0; i < 100; i++) {
    let x = floor(random(width));
    let y = floor(random(height));

    clr = cam.get(x, y);

    noStroke();
    fill(clr);
    //circle(x, y, random(5, 20));
    beginShape();
    vertex(x + random(-30, 30), y + random(-30, 30));
    vertex(x + random(-30, 30), y + random(-30, 30));
    vertex(x + random(-30, 30), y + random(-30, 30));
    endShape();
  }
}