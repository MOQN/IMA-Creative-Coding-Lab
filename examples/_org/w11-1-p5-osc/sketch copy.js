let osc;
let oscIsPlaying = false;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  osc = new p5.Oscillator("sine");
}

function draw() {
  background(220);

  let ampValue = map(mouseY, 0, height, 1.00, 0.00, true);
  osc.amp(ampValue, 0.1); // (value, time);

  let freqValue = map(mouseX, 0, width, 100, 2000, true);
  osc.freq(freqValue, 0.1); // (value, time);

  text(freqValue, 100, 100);
}

function mousePressed() {
  if (oscIsPlaying == false) {
    osc.start();
    oscIsPlaying = true;
  } else {
    osc.stop();
    oscIsPlaying = false;
  }
}

