// Demo Interaction: Mouse Swiped UP/DOWN/LEFT/RIGHT
let startX, startY;
let endX, endY;
let txt = "";
let DISTANCE_THRESHOLD = 80;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220, 50);

  push();
  translate(width / 2, height / 2);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(txt, 0, 0);
  pop();

  text("Swipe with the mouse! (Drag and Release!)", 10, 20);
}

// save starting point
function mousePressed() {
  startX = mouseX;
  startY = mouseY;
}

// when dragging, show the line
function mouseDragged() {
  push();
  stroke(255);
  strokeWeight(3);
  fill(255);
  line(startX, startY, mouseX, mouseY);
  circle(startX, startY, 5);
  pop();
}

// detect swipe direction on release!
function mouseReleased() {
  endX = mouseX;
  endY = mouseY;

  let distance = dist(startX, startY, endX, endY);

  if (distance > DISTANCE_THRESHOLD) {
    let angle = atan2(endY - startY, endX - startX);

    if (angle > radians(-135) && angle < radians(-45)) {
      txt = "Swiped UP!";
    } else if (angle > radians(-45) && angle < radians(45)) {
      txt = "Swiped RIGHT!";
    } else if (angle > radians(45) && angle < radians(135)) {
      txt = "Swiped DOWN!";
    } else {
      txt = "Swiped LEFT!";
    }
    console.log("___");
    console.log("Distance: " + distance.toFixed(2));
    console.log("Angle: " + degrees(angle).toFixed(2));
  } else {
    txt = "Moved too little!";
  }
}