// DM2008 — Activity 2a [Guided]
// Mode Switch (20 min)
//
// Keys 1, 2, 3 switch between modes — each one changes the background color.
// Try extending each mode to also change the fill, size, or speed of the ellipse.
// Keep it simple: one clear change per mode that's easy to see on screen.
//
// Stretch: add a 4th mode, or make the ellipse change shape between modes.

let x = 0;       // ellipse x-position
let size = 50;   // ellipse size
let bgColor;     // background color, changed by key presses
let speed = 2;   // ellipse movement speed

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  noStroke();
}

function draw() {
  background(31, 25, 224);

  // --- Your if/else goes here ---
  // Try swapping this out for your own rule.
  if (mouseIsPressed) {
    fill(255, 252, 64);
    
  } else {
    fill(255);
  }

  // Draw the ellipse at its current position
  ellipse(x, height / 2, size);

  // Move the ellipse
  x += speed;

  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
  }

  // Wrap around when it exits the left edge
  if (x < -size / 2) {
    x = width;
  }
}

// Reverse direction when mouse is clicked
function mousePressed() {
  speed = -speed;
}

// Keys 1, 2, 3 change the background color — this is your mode switch
function keyPressed() {
  switch (key) {
    case "1":
      bgColor = color(200, 100, 100);
      size = 30;
      break; // red

    case "2":
      bgColor = color(100, 200, 100);
      size = 50;
      break; // green

    case "3":
      bgColor = color(100, 100, 200);
      size = 80;
      break; // blue

    case "4":
      bgColor = color(200, 100, 200);
      size = 100;
      break; // purple

    default:
      bgColor = color(220); // grey
      size = 50;
  }
}