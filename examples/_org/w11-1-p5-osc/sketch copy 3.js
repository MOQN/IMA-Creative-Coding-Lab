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

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  particles.push(new Particle(width / 2, height / 2, 100, 261.63));
}

function draw() {
  background(220);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.checkMouse();
    p.updateOsc();
    p.display();
  }
}

//

class Particle {
  constructor(x, y, rad, note) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.note = note; // freq
    this.volume = 0; // amp
    //
    this.osc = new p5.Oscillator("sine");
    this.oscIsPlaying = false;
    //
    this.brightness = 0;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.volume = map(distance, 0, this.rad, 1.00, 0.0);
      this.brightness = map(distance, 0, this.rad, 255, 0);
      if (this.oscIsPlaying == false) {
        this.osc.start();
        this.oscIsPlaying = true;
      }
    } else {
      // out
      this.brightness = 0;
      this.volume = 0.00; // 0%
    }
  }
  updateOsc() {
    this.osc.amp(this.volume, 0.1);
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(this.brightness);
    circle(0, 0, this.rad * 2);

    pop();
  }
}



// let sineValue = sin(frameCount * 0.25);
//   let ampValue = map(sineValue, -1, 1, 0.60, 1.0, true);
//   osc.amp(ampValue, 0.1); // (value, time);

//   let freqValue = notes[noteIndex];
//   osc.freq(freqValue, 0.3); // (value, time);






