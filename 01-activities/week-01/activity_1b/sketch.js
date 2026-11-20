// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;

function setup() {
  createCanvas(800, 800)
  background(255, 254, 232);
  frameRate(10)
}

function draw() {
  
  x = random(50,650);
  y = random(50,550);
  w = random(10, 80);
  
  
  let colors = ["#ff1c46", "#3db1ff", "#ffd21c", "#00c72e","#ff8308","#ffbdd9",];
  fill(random(colors));
  
  // background(240,40);

  noStroke();
  color(random);
  ellipse(x, y,20);
  
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}