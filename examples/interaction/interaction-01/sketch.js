// Demo Interaction: Mouse Moved Fast!
let DISTANCE_THRESHOLD = 100;
let txt = "";

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220, 50);

  let distance = dist(mouseX, mouseY, pmouseX, pmouseY);
  if (distance > DISTANCE_THRESHOLD) {
    // what would you like to do if the mouse is moving fast?
    txt = "Mouse moved fast!";
  } else {
    txt = "";
  }

  // display text at the center of the canvas
  push();
  translate(width / 2, height / 2);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(txt, 0, 0);
  pop();

  // log the distance / speed of mouse movement
  text("Open the console to see the distance/speed of mouse movement", 10, 20);
  console.log("Distance/Speed: " + distance.toFixed(2));
}