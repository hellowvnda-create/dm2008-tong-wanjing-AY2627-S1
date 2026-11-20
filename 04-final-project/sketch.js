
let sheepImg;
let dogImg;
let treeImg1;
let treeImg2;
let treeImg4;
let houseImg;
let gameOverImg;

let fenceX, fenceY;
let fenceW = 250;
let fenceH = 200;

let sheep = [];
let stage = 1;
let gameState = "playing";
let stageCompleteTime = 0;

async function setup() {
  createCanvas(700, 500);

  fenceX = (width - fenceW) / 2;
  fenceY = (height - fenceH) / 2;

  startStage();

  sheepImg = await loadImage("assets/sheep.png");
  dogImg = await loadImage("assets/dog.png");
  treeImg1 = await loadImage("assets/tree2.png");
  treeImg2 = await loadImage("assets/tree1.png");
  treeImg4 = await loadImage("assets/tree4.png");
  houseImg = await loadImage("assets/house.png");
  gameOverImg = await loadImage("assets/sheepdie.png");

  noCursor();
}

function draw() {
  background(116, 165, 127);

  drawTrees();
  drawFence();
  drawHouse();

  // Display stage number
  fill(40, 70, 40);
  noStroke();
  textAlign(CENTER);
  textSize(15);
  text("SHEEP COUNT: " + stage, width / 2, 35);

  // Update and display every sheep
  for (let s of sheep) {
    if (gameState === "playing") {
      s.update();
    }

    s.display();
  }

  // Check for escaping sheep
  if (gameState === "playing") {
    checkGameOver();

    if (gameState === "playing") {
      checkStageComplete();
    }
  }

  if (frameCount < 80 && gameState === "playing") {
  fill(40, 90, 50);
  textAlign(CENTER);
  textSize(32);
  text("Do not let the sheep flock off.", width / 2, height-80);
}

  // Stage completion
  if (gameState === "complete") {
    fill(40, 90, 50);
    textAlign(CENTER);
    textSize(32);
    text("Stage Complete!", width / 2, 80);

    if (millis() - stageCompleteTime > 2000) {
      stage++;
      startStage();
    }
  }

  if (gameState === "gameover") {
    cursor(ARROW); // Show normal cursor
    drawGameOver();
  } else {
    noCursor(); // Hide normal cursor during gameplay

    imageMode(CENTER);
    image(dogImg, mouseX, mouseY, 70, 60);
  }
}

function drawFence() {
  // Slightly lighter grass inside the fence
  fill(131, 138, 117);
  noStroke();
  rect(fenceX, fenceY, fenceW, fenceH);

  // Wooden fence outline
  noFill();
  stroke(115, 95, 61);
  strokeWeight(8);
  rect(fenceX, fenceY, fenceW, fenceH, 5);
}

class Sheep {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 25;

    // Movement
    this.vx = 0;
    this.vy = 0;

    // Mouse interaction settings
    this.detectionRadius = 100;
    this.pushStrength = 1;
    this.friction = 0.92;
    this.maxSpeed = 5;

    this.wanderAngle = random(TWO_PI);
    this.wanderSpeed = random(0.3, 0.7);
    this.turnSpeed = 0.025;
  }

  update() {
    // 1. Calculate distance from dog
    let d = dist(mouseX, mouseY, this.x, this.y);

    // 2. Gradually change wandering direction
    this.wanderAngle += random(-this.turnSpeed, this.turnSpeed);

    // 3. Natural wandering movement
    let wanderVX = cos(this.wanderAngle) * this.wanderSpeed;
    let wanderVY = sin(this.wanderAngle) * this.wanderSpeed;

    // 4. Apply mouse avoidance
    if (d < this.detectionRadius && d > 0) {
      let dx = (this.x - mouseX) / d;
      let dy = (this.y - mouseY) / d;

      let force = map(d, 0, this.detectionRadius, this.pushStrength, 0);

      this.vx += dx * force;
      this.vy += dy * force;
    }

    // 5. Apply friction to pushed movement
    this.vx *= this.friction;
    this.vy *= this.friction;

    // 6. Limit pushed movement speed
    let speed = sqrt(this.vx * this.vx + this.vy * this.vy);

    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }

    // 7. Combine wandering and pushed movement
    this.x += this.vx + wanderVX;
    this.y += this.vy + wanderVY;
  }

  display() {
    push();

    imageMode(CENTER);

    // Draw sheep PNG at its current position
    image(sheepImg, this.x, this.y, 60, 60);

    pop();
  }

  isInsideFence() {
    return (
      this.x - this.radius >= fenceX &&
      this.x + this.radius <= fenceX + fenceW &&
      this.y - this.radius >= fenceY &&
      this.y + this.radius <= fenceY + fenceH
    );
  }
}

function startStage() {
  sheep = [];

  spawnTrees();

  for (let i = 0; i < stage; i++) {
    let x, y;

    // Choose a random side of the fence
    let side = floor(random(4));

    if (side === 0) {
      // Left of fence
      x = random(fenceX - 80, fenceX - 40);
      y = random(fenceY, fenceY + fenceH);

    } else if (side === 1) {
      // Right of fence
      x = random(fenceX + fenceW + 40, fenceX + fenceW + 80);
      y = random(fenceY, fenceY + fenceH);

    } else if (side === 2) {
      // Above fence
      x = random(fenceX, fenceX + fenceW);
      y = random(fenceY - 80, fenceY - 40);

    } else {
      // Below fence
      x = random(fenceX, fenceX + fenceW);
      y = random(fenceY + fenceH + 40, fenceY + fenceH + 80);
    }

    sheep.push(new Sheep(x, y));
  }

  gameState = "playing";
}

function checkStageComplete() {
  // Assume all sheep are inside
  let allInside = true;

  // Check every sheep
  for (let s of sheep) {
    if (!s.isInsideFence()) {
      allInside = false;
      break;
    }
  }

  // Complete the stage if all sheep are inside
  if (allInside) {
    gameState = "complete";
    stageCompleteTime = millis();
  }
}

function checkGameOver() {
  for (let s of sheep) {
    // Check if any sheep has completely left the canvas
    if (
      s.x + s.radius < 0 ||
      s.x - s.radius > width ||
      s.y + s.radius < 0 ||
      s.y - s.radius > height
    ) {
      gameState = "gameover";
      break;
    }
  }
}

function drawGameOver() {
  // Game Over image
  imageMode(CENTER);
  image(gameOverImg, width / 2, height / 2 - 35, 450, 260);
}

function mousePressed() {
  if (gameState === "gameover") {
    if (
      mouseX > width / 2 - 65 &&
      mouseX < width / 2 + 65 &&
      mouseY > height / 2 - 5 &&
      mouseY < height / 2 + 30
    ) {
      stage = 1;
      startStage();
    }
  }
}

function spawnTrees() {
  // Tree 1 - Left bottom of fence
  tree1X = random(50, fenceX - 50);
  tree1Y = random(height / 2, height - 50);

  // Tree 2 - Right bottom side of fence
  tree2X = random(fenceX + fenceW + 50, width - 50);
  tree2Y = random(height / 2 + 50, height - 50);

  // Tree 4 - Left top side of fence
  tree4X = random(50, fenceX - 50);
  tree4Y = random(50, height / 2);
}

function drawTrees() {
  imageMode(CENTER);
  image(treeImg1, tree1X, tree1Y, 70, 80);
  image(treeImg2, tree2X, tree2Y, 70, 80);
  image(treeImg4, tree4X, tree4Y, 70, 80);
}

function drawHouse() {
  imageMode(CENTER);

  // Fixed house position
  image(houseImg, 600, 190, 120, 100);
}
