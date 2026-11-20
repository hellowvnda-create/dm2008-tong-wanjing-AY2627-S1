// DM2008 — Activity 3a [Guided]
// Array Sampler (25 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let expressions = ["surprised", "neutral"];
let palette = ["#f06449", "#3c78d8"];
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(palette[currentIndex]);

  noStroke();
  fill("#ffeb3b");
  ellipse(width / 2, height / 2, 200);

  fill(0);
  ellipse(165, 175, 20);
  ellipse(235, 175, 20);

  if (expressions[currentIndex] == "surprised") {
    ellipse(200, 240, 35, 45);
  } else {
    stroke(0);
    strokeWeight(5);
    line(165, 240, 235, 240);
  }
}

function mousePressed() {
  currentIndex++; // shorthand for currentIndex += 1

  // Wrap back to the start when we reach the end
  if (currentIndex >= expressions.length) {
    currentIndex = 0;
  }

  console.log("Current index:", currentIndex, "→", expressions[currentIndex]);
}