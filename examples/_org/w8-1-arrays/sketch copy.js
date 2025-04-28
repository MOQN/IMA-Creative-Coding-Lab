let num = 10;
let numbers = [5, 10, 15];
let result;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  numbers[1] = -5
  numbers[3] = 100; // add more value

  result = numbers[3];
  console.log(numbers);
}

function draw() {
  background(220);

  textSize(20);
  text(result, 100, 100);
}