let cam;
let img;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");

  img = createImage(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();

  background(255);
}

function draw() {
  //background(220);

  //tint(255, 0, 255);
  //image(cam, 0, 0);

  cam.loadPixels();
  img.loadPixels();

  for (let y = 0; y < height; y += 20) {
    for (let x = 0; x < width; x += 20) {
      let index = (x + y * width) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      img.pixels[index + 1] = r * 2;
      img.pixels[index + 1] = g * 2;
      img.pixels[index + 2] = b * 2;
      img.pixels[index + 3] = 255;

      fill(r, g, b);
      rect(x, y, 20, 20);
    }
  }

  //img.updatePixels();

  //image(img, 0, 0);

}