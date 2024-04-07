const LERP_AMOUNT = 0.3;
const BUTTON_RADIUS = 60;
const HOVER_SCALE = 2.0;
const EXTRA_SPACE = 120;

let canvas;
let buttons = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(255);
  loadStrings(filename, generateButtons);
}

function draw() {
  background(255);

  for (const btn of buttons) {
    btn.update(buttons);
    btn.display();
  }
}

function generateButtons(results) {
  for (const r of results) {
    let info = split(r, ",");
    buttons.push(
      new Button(
        random(width),
        random(height),
        BUTTON_RADIUS,
        info[0],
        info[1],
        info[2]
      )
    );
  }
}

class Button {
  constructor(x, y, rad, name, title, link) {
    this.pos = new p5.Vector(x, y);
    this.vel = new p5.Vector();
    this.acc = new p5.Vector();
    this.rad = rad;
    this.radMin = rad;
    this.radMax = rad * HOVER_SCALE;
    this.mouseOn = false;
    // info
    this.title = title;
    this.name = name;
    this.link = link;
    // HTML
    this.elt;
    this.createElements();
  }
  update(others) {
    let centerVec = new p5.Vector(width / 2, height / 2);
    this.attractedTo(centerVec);
    this.centered();
    this.repel(others);
    this.checkMouse();
    this.move();
    this.adjustVel(-0.02);

    this.elt.style.left = this.pos.x + "px";
    this.elt.style.top = this.pos.y + "px";
    this.elt.style.width = this.rad * 2 + "px";
    this.elt.style.height = this.rad * 2 + "px";
  }
  centered() {
    let distance = width * 0.15;
    if (this.pos.y < distance) {
      let mag = map(this.pos.y, 0, distance, 1.0, 0);
      let force = new p5.Vector(0, mag);
      this.applyForce(force);
    }
    if (this.pos.y > height - distance) {
      let mag = map(this.pos.y, height - distance, height, 0, 1.0);
      let force = new p5.Vector(0, -mag);
      this.applyForce(force);
    }
  }
  createElements() {
    this.elt = document.createElement("div");
    this.elt.className = "box-project";
    this.elt.style.width = this.rad * 2 + "px";
    this.elt.style.height = this.rad * 2 + "px";
    document.body.appendChild(this.elt);

    let titleDiv = document.createElement("div");
    titleDiv.className = "box-title";
    titleDiv.innerHTML = this.title;
    this.elt.appendChild(titleDiv);

    let nameDiv = document.createElement("div");
    nameDiv.className = "box-name";
    nameDiv.innerHTML = this.name;
    this.elt.appendChild(nameDiv);
  }
  attractedTo(targetVec) {
    let vec = p5.Vector.sub(targetVec, this.pos);
    vec.mult(0.0005);
    this.applyForce(vec);
  }
  repel(others) {
    for (const other of others) {
      let vec = p5.Vector.sub(other.pos, this.pos);
      let distance = vec.mag();
      let maxDist = this.rad + other.rad + EXTRA_SPACE;
      if (distance > 0 && distance < maxDist) {
        let mag = pow(map(distance, 0, maxDist, 0.29, 0), 3);
        vec.mult(mag);
        other.applyForce(vec);
        vec.mult(-1);
        this.applyForce(vec);
      }
    }
  }
  adjustVel(amount) {
    let adjustment = 1.0 + amount;
    this.vel.mult(adjustment);
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(f) {
    let force = f.copy();
    // no division here
    this.acc.add(force);
  }
  checkMouse() {
    let mouseVec = new p5.Vector(mouseX, mouseY);
    let distance = this.pos.dist(mouseVec);
    if (distance < this.rad) {
      // mouse is in the area
      this.rad = lerp(this.rad, this.radMax, LERP_AMOUNT);
      this.elt.style.zIndex = 30;
      this.vel.mult(0);
      this.acc.mult(0);
      this.mouseOn = true;
      if (mouseIsPressed) {
        this.pos.x = random(width);
        this.pos.y = random(height);
        window.open(this.link, "CCLabProject");
      }
    } else {
      // mouse is out of the area
      this.rad = lerp(this.rad, this.radMin, LERP_AMOUNT);
      this.elt.style.zIndex = 20;
      this.mouseOn = false;
    }
  }
  display() {
    if (!this.mouseOn) return;
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    let g = map(sin(frameCount * 0.05), -1, 1, 200, 255);
    //fill(255, g, 0);
    fill(0, 255, g);
    let scl = map(sin(frameCount * 0.04), -1, 1, 2.42, 2.5);
    ellipse(0, 0, this.rad * scl, this.rad * scl);
    pop();
  }
}

window.addEventListener("resize", () => {
  canvas = createCanvas(windowWidth, windowHeight);
});

//

/* global p5 ml5 alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult */
