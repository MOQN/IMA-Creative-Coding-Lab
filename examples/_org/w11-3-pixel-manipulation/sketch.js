let cam;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");

  cam = createCapture(VIDEO);
  cam.hide();

  background(255);
}

function draw() {
  background(0);

  //let gridSize = floor(map(mouseX, 0, width, 5, 80, true));
  let gridSize = 15;
  cam.loadPixels();
  for (let y = 0; y < cam.height; y += gridSize) {
    stroke(255);
    noFill();
    beginShape();
    for (let x = 0; x < cam.width; x += gridSize) {

      let index = (x + y * cam.width) * 4; // ***

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b) / 3; // brightness
      let yAdj = map(avg, 0, 255, 0, gridSize * 2);
      curveVertex(x, y + yAdj);
    }
    endShape();
  }
}