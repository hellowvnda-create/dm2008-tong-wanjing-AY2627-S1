let port; // Serial communication port
let connectBtn;
let wasOpened = false;

let sensorVal;
let val = 50; // Default distance
let circleSize = 50;
let targetSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);

  port = createSerial();

  // Connection button
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background("#808000");

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");

    if (sensorVal && sensorVal.trim() !== "") {
      let newVal = Number(sensorVal.trim());

      // Accept only valid sensor readings
      if (Number.isFinite(newVal)) {
        val = constrain(newVal, 5, 100);
      }
    }
  }

  // Map distance to shape size: closer = bigger
  targetSize = map(val, 5, 100, 400, 50);

  // Smoothly animate size changes
  circleSize = lerp(circleSize, targetSize, 0.1);

  // Shape size
  let s = circleSize;
  let x = width / 2;
  let y = height / 2;

  // Draw pink main shape
  noStroke();
  fill("#FFD1DC");

if (val < 32) {
  // CLOSE: Circle
  ellipse(x, y, s, s);

// } else if (val < 67) {
//   // MEDIUM: Square
//   rectMode(CENTER);
//   rect(x, y, s, s);
//   rectMode(CORNER);

} else {
  // FAR: Triangle
  triangle(
    x, y - s / 2,
    x - s / 2, y + s / 2,
    x + s / 2, y + s / 2
  );
  }

  // Draw smaller squares across the screen
  let squareSize = 30;

  for (
    let i = 0;
    i < width - squareSize;
    i += squareSize * 2
  ) {
    fill("#FFD1DC");

    // Closer = thicker outline
    stroke(0);
    strokeWeight(map(val, 5, 100, 8, 2));

    rect(
      i + squareSize,
      height / 2 + 220,
      squareSize,
      squareSize
    );
  }

  // Display sensor information
  // fill(255);
  // noStroke();
  // textSize(16);
  // textAlign(LEFT);
  // text("Distance: " + val.toFixed(1) + " cm", 20, 80);

  // if (val < 35) {
  //   text("Shape: Circle", 20, 105);
  // } else if (val < 70) {
  //   text("Shape: Square", 20, 105);
  // } else {
  //   text("Shape: Triangle", 20, 105);
  // }

  // Update connection button
  updateConnectBtn();
}

// Connect or disconnect from Arduino
function connectBtnClick() {
  if (!port.opened()) {
    port.open(9600);
  } else {
    port.close();
  }
}

// Keep button label in sync with connection
function updateConnectBtn() {
  let isOpened = port.opened();

  if (isOpened === wasOpened) return;

  wasOpened = isOpened;

  connectBtn.html(
    isOpened ? "Disconnect Arduino" : "Connect to Arduino"
  );

  if (isOpened) {
    connectBtn.addClass("connected");
  } else {
    connectBtn.removeClass("connected");
  }
}

// Resize canvas with browser window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}