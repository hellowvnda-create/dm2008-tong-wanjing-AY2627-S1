// DM2008 — Activity 3b
// One Function Wonder (30 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.

let palette = ["#ffa57d", "#ed719e", "#b1dd8c", "#53d5fd"];
let balloonCount = 1;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  frameRate(4);
}

function draw() {
  background(220);

  // Call your function here with different values each time
  for (let i = 0; i < balloonCount; i++) {
    balloon(random(width), random(height / 2), 80, 100, color(random(palette)));
  }
}

function mousePressed() {
  
    balloonCount++;
  
}
// Define your function outside draw()
// It can be called from anywhere in your sketch

function balloon(x, y, s, h, c) {
  stroke(250);
  strokeWeight(2);
  line(x, y, width / 2, 400);
  noStroke();
  fill(c);
  ellipse(x, y, s, h);
}
