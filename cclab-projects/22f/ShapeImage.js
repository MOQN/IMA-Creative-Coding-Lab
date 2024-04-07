class ShapeImage {
  constructor(size, color) {
    this.number = floor(random(1, 5));
    this.radDist = size * 0.40;
    this.firstDist = 0;
    this.lastDist = 0;
    this.lerpAngle = 270;
    this.angleOffset = random(TWO_PI);
    this.noiseOffset = random(100);
    this.color = color;

    this.points = this.generatePoints();
    this.graphics = this.generateGraphics(size, size);

    return this;
  }
  get() {
    return this.graphics;
  }
  show() {
    image(this.graphics, 0, 0);
  }
  generatePoints() {
    let points = [];
    for (let angle = 0; angle <= 360; angle += 2) {
      let rad = radians(angle) + this.angleOffset;
      let sineVal = map(sin(rad * this.number), -1, 1, this.radDist * 0.75, this.radDist);
      let noiseVal = map(noise(rad * 0.2 + this.noiseOffset), 0, 1, -this.radDist * 0.5, this.radDist * 0.3);
      let distance = sineVal + noiseVal;
      if (angle > this.lerpAngle) {
        let pct = map(angle, this.lerpAngle, 360, 0.0, 1.0);
        distance = lerp(distance, this.firstDist, pct);
      }
      let x = cos(rad) * distance;
      let y = sin(rad) * distance;
      points.push(new p5.Vector(x, y));

      if (angle == 0) {
        points.push(new p5.Vector(x, y)); // first control point
        this.firstDist = distance;
      } else if (angle == this.lerpAngle) {
        this.lastDist = distance;
      } else if (angle == 360) {
        points.push(new p5.Vector(x, y)); // last control point
      }
    }

    return points;
  }
  generateGraphics(w, h) {
    let g = createGraphics(w, h);
    g.translate(w / 2, h / 2);
    //g.rotate(random(TWO_PI));
    g.noStroke();
    if (this.color) {
      g.fill(this.color);
    } else {
      g.fill(random(210), random(210), random(210), 120);  
    }
    
    g.beginShape();
    for (const p of this.points) {
      g.vertex(p.x, p.y);
    }
    g.endShape(CLOSE);

    return g;
  }
}

/* global

p5 ml5 alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase 2D Primitives arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex plane box sphere cylinder cone ellipsoid torus loadModel model HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS print frameCount deltaTime focused cursor frameRate noCursor displayWidth displayHeight windowWidth windowHeight windowResized width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams remove disableFriendlyErrors noLoop loop isLooping push pop redraw select selectAll removeElements changed input createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement createCanvas resizeCanvas noCanvas createGraphics blendMode drawingContext setAttributes boolean string number applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate storeItem getItem clearStorage removeItem createStringDict createNumberDict append arrayCopy concat reverse shorten shuffle sort splice subset float int str byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ turnAxis setMoveThreshold setShakeThreshold deviceMoved deviceTurned deviceShaken keyIsPressed key keyCode keyPressed keyReleased keyTyped keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseWheel mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveFrames image tint noTint imageMode pixels blend copy filter THRESHOLD GRAY OPAQUE INVERT POSTERIZE BLUR ERODE DILATE get loadPixels set updatePixels loadImage loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo Output createWriter save saveJSON saveStrings saveTable day hour minute millis month second year abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess camera perspective ortho frustum createCamera setCamera CENTER CORNER CORNERS POINTS WEBGL RGB ARGB HSB LINES CLOSE BACKSPACE DELETE ENTER RETURN TAB ESCAPE SHIFT CONTROL OPTION ALT UP_ARROW DOWN_ARROW LEFT_ARROW RIGHT_ARROW sampleRate freqToMidi midiToFreq soundFormats getAudioContext userStartAudio loadSound createConvolver setBPM saveSound getMasterVolume masterVolume soundOut chain drywet biquadFilter process freq res gain toggle setType pan phase triggerAttack triggerRelease setADSR attack decay sustain release dispose notes polyvalue AudioVoice noteADSR noteAttack noteRelease isLoaded playMode set isPlaying isPaused setVolume getPan rate duration currentTime jump channels frames getPeaks reverseBuffer onended setPath setBuffer processPeaks addCue removeCue clearCues getBlob getLevel toggleNormalize waveform analyze getEnergy getCentroid linAverages logAverages getOctaveBands fade attackTime attackLevel decayTime decayLevel releaseTime releaseLevel setRange setExp width output stream mediaStream currentSource enabled amplitude getSources setSource bands panner positionX positionY positionZ orient orientX orientY orientZ setFalloff maxDist rollof leftDelay rightDelay delayTime feedback convolverNode impulses addImpulse resetImpulse toggleImpulse sequence getBPM addPhrase removePhrase getPhrase replaceSequence onStep musicalTimeMode maxIterations synced bpm timeSignature interval iterations compressor knee ratio threshold reduction record isDetected update onPeak WaveShaperNode getAmount getOversample amp setInput connect disconnect play pause stop start add mult
*/
