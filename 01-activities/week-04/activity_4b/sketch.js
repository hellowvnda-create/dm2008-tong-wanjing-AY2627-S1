// DM2008 — Activity 4b [Guided]
// Objects in Motion (50 min)
//
// You have a working Agent class to start with — your job is to bring it to life.
// Each agent moves, changes over time, and is drawn to the screen.
// Mouse click adds a new agent. C clears them all.
//
// Things to try:
// - Change the starting values (size, speed, color) to see what happens
// - Make agents bounce instead of wrap — what needs to change?
// - Add a second method to your class beyond update() and show()
//
// Stretch: give each agent a lifespan — shrink or fade it over time, then remove it.
// Hint: a backward loop lets you safely splice items while iterating.

let agents = [];
const NUM_START = 12;

function setup() {
  createCanvas(600, 400);
  noStroke();

  for (let i = 0; i < NUM_START; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(50, 70);
    let speedX = random(-20, 30);
    let speedY = random(-20, 20);
    agents.push(new Agent(x, y, sz, speedX, speedY));
  }
}

function draw() {
  background(255,30);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].show();
  }
}

function mousePressed() {
  let sz = random(70, 80);
  let speedX = random(-2, 2);
  let speedY = random(-2, 2);
  agents.push(new Agent(mouseX, mouseY, sz, speedX, speedY));
}

function keyPressed() {
  // Replacing the array with an empty one effectively clears all agents
  if (key == "C" || key == "c") {
    agents = [];
  }
}

class Agent {
  constructor(x, y, sz, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.sz = random(sz);
    this.dx = speedX;
    this.dy = speedY;
    this.col = random(255); // a color value that will change over time
    // What else might your agent need to know about itself?
    this.growRate = random(-2, 2);
  }

  update() {
    // Position changes by speed each frame — can you see why?
    this.x += this.dx;
    this.y += this.dy;

    // This is a property changing over time — try changing size or speed instead
    this.col = (this.col + 1) % 255;
    //this.sz = (this.sz + this.growRate) % 70;
    //wjnotes: 1 is the speed of growth, this.growRate is akso speed of growth that could be a value but we made it a variable so there can be a range
    
    // This wraps agents around the edges — could you make them bounce instead?
    if (this.x > width) {
      this.dx *= -1;
      
    }
    if (this.x < 0) {
      this.dx *= -1;
    }
    if (this.y > height) {
      this.dy *= -1;
    }
    if (this.y < 0) {
      this.dy *= -1;
    }
  }

  show() {
    // this.col drives the color shift — how could you use your other properties here?
    fill(10, this.col, 220);
    ellipse(this.x, this.y, this.sz);
  }
}
