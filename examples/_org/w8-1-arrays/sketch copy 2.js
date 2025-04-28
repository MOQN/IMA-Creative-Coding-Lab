let result;
let colorNames = [
  "red", "coral", "pink", "olive"
];


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //result = colorNames[0]; // first index
  result = colorNames[colorNames.length - 1]; // last index

  console.log(colorNames.length);
}

function draw() {
  background(220);

  textSize(20);
  text(result, 100, 100);
}