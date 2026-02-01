let flowers = [];
let bees = [];
let overAllTexture;

let colors = ["#cdb4dbc0", "#ffc8dd9c", "#ffafccc8", "#bde0feb4", "#a2d2ffaf"];

function setup() {
  const container = document.getElementById("p5-canvas");
  const canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent("p5-canvas");

  angleMode(DEGREES);
  background(0);

  for (let i = 0; i < 10; i++) {
    flowers.push(generateRandomFlowra());
  }

  for (let i = 0; i < 5; i++) {
    bees.push({
      x: random(width),
      y: random(height),
      speed: random(0.01, 0.2),
    });
  }

  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (let i = 0; i < width; i++) {
    for (let o = 0; o < height; o++) {
      overAllTexture.set(
        i,
        o,
        color(100, noise(i / 3, o / 3, (i * o) / 50) * random([0, 50, 100]))
      );
    }
  }
  overAllTexture.updatePixels();
}

function windowResized() {
  const container = document.getElementById("p5-canvas");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}


function windowResized() {
  const container = document.getElementById("p5-canvas");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function generateRandomFlowra(x, y) {
  return {
    x: x || random(width),
    y: y || random(height),
    size: random(2),
    color: random(colors),
  };
}

function drawBee(bee) {
  push();
  translate(bee.x, bee.y);
  noStroke();

  fill(254, 249, 239, 80);
  rotate(60);
  ellipse(10, -30, 55, 15);

  fill(254, 249, 239, 80);
  rotate(20);
  ellipse(5, -50, 55, 15);

  rotate(-80);
  fill("#F9C74F");
  rect(0, 0, 80, 55, 30);

  stroke("#6C584C");
  strokeWeight(5);
  line(25, 2, 25, 53);
  line(45, 2, 45, 53);

  pop();
}

function drawFlora(flower) {
  push();
  translate(flower.x, flower.y);
  rotate(flower.size);

  stroke(200, 200, 63);
  fill(167, 201, 87);
  circle(0, 0, 50);

  ellipseMode(CORNER);
  fill(flower.color || "#FFD700");

  for (let i = 0; i < 18; i++) {
    ellipse(30, -15, 80 * flower.size, 50);
    rotate(30);
  }

  pop();
}

function mousePressed() {
  flowers.push(generateRandomFlowra(mouseX, mouseY));
}

function draw() {
    clear();

  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];
    drawFlora(flower);

    let hasBee = false;
    for (let o = 0; o < bees.length; o++) {
      let bee = bees[o];
      if (dist(bee.x, bee.y, flower.x, flower.y) < 200) {
        hasBee = true;
      }
    }

    flower.size = hasBee
      ? lerp(flower.size, 2, 0.1)
      : lerp(flower.size, 0, 0.01);
  }

  for (let o = 0; o < bees.length; o++) {
    let bee = bees[o];
    bee.x = lerp(bee.x, mouseX + o * 4, bee.speed);
    bee.y = lerp(bee.y, mouseY + o * 4, bee.speed);
    drawBee(bee);
  }

  push();
  blendMode(MULTIPLY);
  image(overAllTexture, 0, 0);
  pop();
}
