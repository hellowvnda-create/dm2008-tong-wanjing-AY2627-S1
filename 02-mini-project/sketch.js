// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get the bird flapping — add control in keyPressed()
// 2. Get pipes spawning — uncomment the spawn logic in draw()
// 3. Add collision detection between the bird and pipes
// 4. Add scoring when the bird passes a pipe
// 5. Add game states — at minimum a playing state and a game over state
//
// Stretch: add a start screen, a high score, or a difficulty curve.

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score = 0;
let spawnCounter = 0;
let birdImg;
let skyImg;
let houseImg;
let gameoverImg;
let gameFont;
let topCapImg;
let bottomCapImg;
let pipeBodyImg;

const SPAWN_RATE = 90;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 180;
const PIPE_W = 70;

// Game states: "playing" or "gameover" — add more if you need them
let gameState = "playing";

/* ----------------- Setup & Draw ----------------- */
async function setup() {
  createCanvas(480, 640);
  imageMode(CENTER);
  noStroke();
  bird = new Bird(width / 2, height / 2);
  pipes.push(new Pipe(width + 40));

  //Load bird n sky photo
  birdImg= await loadImage("assets/totoro.png");
  skyImg= await loadImage("assets/sky.png");
  houseImg= await loadImage("assets/house.png");
gameoverImg = await loadImage("assets/gameover.png");
  topCapImg= await loadImage("assets/topCap.png");
    bottomCapImg= await loadImage("assets/bottomCap.png");
  pipeBodyImg= await loadImage("assets/pipeBody.png");
   // Load font
  gameFont = await loadFont("assets/myfont.ttf");
}

function draw() {
  background(18, 22, 28);
  image(skyImg, width/2, height/2, 480,640);

  if (gameState === "playing") {
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        console.log("HIT");
         gameState = "gameover";
        // What should happen when the game ends?
      }

      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        score++;
        // increment score here
        pipes[i].passed = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
image(houseImg, width/2, height/2, 480,640);
    bird.show();

    // Display the score — look up textAlign() and textSize() in the p5.js reference
  }

  if (gameState === "gameover") {
    // What should the player see when the game ends?
    // How do they restart?
    for (let i = pipes.length - 1; i >= 0; i--) {
  pipes[i].show();      
}

     image(houseImg, width/2, height/2, 480,640);

     bird.show();

  // Game over pop-up
//  fill(40);
  rectMode(CENTER);
  //rect(width / 2, height / 2, 300, 220, 20);
// Game over pop-up image
image(gameoverImg, width / 2, height / 2, 400, 520);
    

    
  // Game Over text
 //fill(255);
  //textAlign(CENTER);
  //textSize(32);
  //text("GAME OVER", width / 2, height / 2 - 50);

  // Final score
  textSize(20);
    textFont(gameFont);
  text("Final Score: " + score, width / 2, height/2 + 10);

  // Restart button
  fill(77,77,11);
  rect(width / 2, height / 2 + 50, 140, 45, 10);

  fill(255);
  textSize(18);
    textFont(gameFont);
  text("RESTART", width / 2, height / 2 + 60);

  rectMode(CORNER);  
  }
}

/* ----------------- Input ----------------- */
function keyPressed() {
 if (key == " " && gameState === "playing"){
    bird.flap();
  }
  if (key == " " && gameState === "gameover") {
    restartGame();
 }
  // Make the bird flap on space or UP_ARROW — call bird.flap()
}

function mousePressed() {
  if (gameState === "gameover") {
    if (
      mouseX > width / 2 - 70 &&
      mouseX < width / 2 + 70 &&
      mouseY > height / 2 + 42 &&
      mouseY < height / 2 + 87
    ) {
      restartGame();
    }
  }
}

function restartGame() {
  score = 0;
  spawnCounter = 0;
  pipes = [];

  bird = new Bird(width / 2, height / 2);
  pipes.push(new Pipe(width + 40));

  gameState = "playing";
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 18;
    this.gravity = 0.5  ;
    this.flapStrength = -8.9;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
       gameState = "gameover";
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
        gameState = "gameover";
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }

  show() {
    image(
      birdImg,this.pos.x, this.pos.y, 180,100 
      );  
   //fill(255, 205, 80);
    //circle(this.pos.x, this.pos.y, this.r * 2);
    //fill(40);
    //circle(this.pos.x + 6, this.pos.y - 4, 4);
    fill(255);
textSize(32);
textAlign(CENTER);
text(score, width / 2, 50);
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;
    this.scored = false;

    const margin = 50;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  //show() {
  // fill(255);
   //rect(this.x, 0, this.w, this.top);
    //rect(this.x, this.bottom, this.w, height - this.bottom);
 //}

  show() {
    let capH=65;
      
  // Top cap
  
    fill(87, 89, 77);
   rect(this.x, 0, this.w, this.top-capH/2);
    rect(this.x, this.bottom+capH/2, this.w, height - this.bottom);
    
    image(
    bottomCapImg,
    this.x+this.w/2,
    this.top-capH/ 2,
    this.w*1.4,
    capH
  );

  // Bottom cap
  image(
    bottomCapImg,
    this.x + this.w / 2,
    this.bottom + capH / 2,
    this.w*1.4,
    capH
  );

}

  offscreen() {
    // 'return' sends a value back to wherever this method was called
    // We'll cover this properly next week, for now just know it gives back true or false
    return this.x + this.w < 0;
  }

  // Checks if the bird overlaps with either pipe rectangle
  // 1) Is the bird within the pipe's x range?
  // 2) If yes, is it outside the gap — above the top or below the bottom?
  hits(bird) {
    // This method also uses 'return' — coming up next week!
    const withinX = (bird.pos.x + bird.r >= this.x) && (bird.pos.x - bird.r <= this.x + this.w);
    const aboveGap = bird.pos.y - bird.r <= this.top;
    const belowGap = bird.pos.y + bird.r >= this.bottom;
      if (withinX && (aboveGap || belowGap)) {
    return true;
  }

}
}