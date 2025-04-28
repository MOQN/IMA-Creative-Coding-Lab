let noteIndex = 0;
let notes = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.0, // G4
  440.0, // A4
  493.88, // B4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  698.46, // F5
  783.99, // G5
  880.0, // A5
  987.77, // B5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
  1396.91, // F6
  1567.98, // G6
  1760.0, // A6
  1975.53, // B6
  2093.0, // C7
];


let osc;
let oscIsPlaying = false;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  osc = new p5.Oscillator("sine");
}

function draw() {
  background(220);

  let sineValue = sin(frameCount * 0.25);
  let ampValue = map(sineValue, -1, 1, 0.60, 1.0, true);
  osc.amp(ampValue, 0.1); // (value, time);

  let freqValue = notes[noteIndex];
  osc.freq(freqValue, 0.3); // (value, time);

  text(freqValue, 100, 100);
}

function mousePressed() {
  if (oscIsPlaying == false) {
    osc.start();
    oscIsPlaying = true;
  } else {
    //osc.stop();
    //oscIsPlaying = false;
    noteIndex++;
  }
}

