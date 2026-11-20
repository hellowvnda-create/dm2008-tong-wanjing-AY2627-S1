// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

let y = 200;
let speed = -2;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(8, 54, 77);

  for (let i = 0; i < width; i += 50) {
    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
    if (mouseIsPressed) {
      fill(8, 54, 77);
    } else if (i % 100 == 0) {
      fill(248, 255, 48);
    } else {
      fill(181, 255, 248);
    }

    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
    if (i % 100 == 0) {
      ellipse(i + 25, y, 40);
    } else {
      rect(i + 25, height - y, 40, 40);
    }
  }

  // Move the shapes
  y += speed;

  // Bounce when the shapes reach the edges
  if (y <= 20 || y >= height - 20) {
    speed = -speed;
  }
}