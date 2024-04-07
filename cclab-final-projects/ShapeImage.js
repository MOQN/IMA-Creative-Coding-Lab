class ShapeImage {
  constructor(size, color) {
    this.number = floor(random(1, 5));
    this.radDist = size * 0.4;
    this.firstDist = 0;
    this.lastDist = 0;
    this.lerpAngle = 270;
    this.angleOffset = random(TWO_PI);
    this.noiseOffset = random(100);
    this.color = color;

    //this.points = this.generatePoints();
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
      let sineVal = map(
        sin(rad * this.number),
        -1,
        1,
        this.radDist * 0.75,
        this.radDist
      );
      let noiseVal = map(
        noise(rad * 0.2 + this.noiseOffset),
        0,
        1,
        -this.radDist * 0.5,
        this.radDist * 0.3
      );
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

    /*
    g.push();
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

    g.pop();
    */

    // shapes
    function drawRandomShape(x, y, size) {
      let chance = random();
      if (chance < 0.5) {
        g.circle(x, y, size);
      } else if (chance < 0.8) {
        g.push();
        g.translate(x, y);
        let ch = random();
        if (ch < 0.15) {
          g.rotate(radians(30));
        } else if (ch < 0.3) {
          g.rotate(radians(-30));
        }
        g.rectMode(CENTER);
        g.rect(0, 0, size, size);
        g.pop();
      } else {
        g.push();
        g.translate(x, y);
        g.rotate(random(TWO_PI));
        g.triangle(
          0,
          -size * 0.45,
          -size / 2,
          size * 0.45,
          size / 2,
          size * 0.45
        );
        g.pop();
      }
    }
    function drawLinePattern(x, y, size) {
      g.push();
      g.translate(x, y);
      g.rotate(random(TWO_PI));
      for (let i = -size; i <= size; i += 3) {
        g.line(-size, i, size, i);
      }
      g.pop();
    }
    function drawCirclePattern(x, y, size) {
      g.push();
      g.translate(x, y);
      g.rotate(random(TWO_PI));
      let dia = random(2,4);
      let gap = random(3, 10);
      for (let j = -size; j <= size; j += dia + gap) {
        for (let i = -size; i <= size; i += dia + gap) {
          g.circle(i, j, dia);
        }
      }
      g.pop();
    }
    g.push();
    g.blendMode(DIFFERENCE);
    g.fill(255);
    g.strokeWeight(1);
    let dst = 25;
    drawRandomShape(
      w / 2 + random(-dst, dst),
      h / 2 + random(-dst, dst) - 20,
      random(40, 100)
    );
    drawRandomShape(
      w / 2 + random(-dst, dst),
      h / 2 + random(-dst, dst) - 20,
      random(10, 60)
    );

    g.pop();
    //g.filter(INVERT);

    push();
    if (random() < 0.8) {
      g.stroke(255, 150);
      g.strokeWeight(1);
      drawLinePattern(
        w / 2 + random(-dst, dst),
        h / 2 + random(-dst, dst) - 20,
        random(20, 50)
      );
    } else {
      g.noStroke();
      g.fill(240);
      drawCirclePattern(
        w / 2 + random(-dst, dst),
        h / 2 + random(-dst, dst) - 20,
        random(20, 50)
      );
    }

    pop();

    // outer stroke
    g.stroke(210);
    g.noFill();
    g.rect(0, 0, w, h);

    g.stroke(140);
    let len = 0.07;
    g.line(0, 0, w * len, 0);
    g.line(0, 0, 0, h * len);
    g.line(w, 0, w - w * len, 0);
    g.line(w, 0, w, h * len);
    g.line(w, h, w - w * len, h);
    g.line(w, h, w, h - h * len);
    g.line(0, h, w * len, h);
    g.line(0, h, 0, h - h * len);

    return g;
  }
}

/* global
p5, ml5, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE, BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD, CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES, DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE, ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT, HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT, LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER, MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI, PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP, QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN, RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE, SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL, accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation, displayHeight, displayWidth, focused, frameCount, height, isKeyPressed, key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX, movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX, pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ, pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ, touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth, abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append, applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, circle, clear, clearStorage, color, colorMode, concat, cone, constrain, copy, cos, createA, createAudio, createButton, createCamera, createCanvas, createCapture, createCheckbox, createColorPicker, createDiv, createElement, createFileInput, createGraphics, createImage, createImg, createInput, createNumberDict, createP, createRadio, createSelect, createShader, createSlider, createSpan, createStringDict, createVector, createVideo, createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normal, normalMaterial, orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, smooth, sort, specularColor, specularMaterial, sphere, splice, split, splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, writeFile, year
*/
