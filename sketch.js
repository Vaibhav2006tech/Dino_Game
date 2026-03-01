let dino;
let obstacles = [];
let gravity = 0.8;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
}

function draw() {
  background(240);

  // Ground
  stroke(0);
  line(0, height - 50, width, height - 50);

  if (!gameOver) {
    // Spawn obstacles
    if (frameCount % 90 === 0) {
      obstacles.push(new Obstacle());
    }
    score++;
  }

  // Score display
  fill(0);
  textSize(20);
  text("Score: " + score, 650, 30);

  dino.update();
  dino.show();

  // Handle obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (dino.hits(obstacles[i])) {
      gameOver = true;
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Game Over screen
  if (gameOver) {
    textSize(40);
    fill(255, 0, 0);
    text("GAME OVER", 270, 200);

    textSize(20);
    fill(0);
    text("Press R to Restart", 310, 240);
  }
}

function keyPressed() {

  // SPACE = Jump (keyCode 32)
  if (!gameOver && keyCode === 32) {
    dino.jump();
  }

  // R = Restart
  if (gameOver && (key === 'r' || key === 'R')) {
    restartGame();
  }

  return false; // Prevent browser default behavior
}

function restartGame() {
  obstacles = [];
  score = 0;
  gameOver = false;
}

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 100;
    this.w = 40;
    this.h = 50;
    this.velocity = 0;
  }

  jump() {
    if (this.y >= height - 100) {
      this.velocity = -15;
    }
  }

  hits(obstacle) {
    return !(
      this.x + this.w < obstacle.x ||
      this.x > obstacle.x + obstacle.w ||
      this.y + this.h < obstacle.y ||
      this.y > obstacle.y + obstacle.h
    );
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    // Stop at ground
    if (this.y > height - 100) {
      this.y = height - 100;
      this.velocity = 0;
    }
  }

  show() {
    fill(50);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Obstacle {
  constructor() {
    this.w = 20;
    this.h = random(30, 60);
    this.x = width;
    this.y = height - 50 - this.h;
    this.speed = 6;
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  show() {
    fill(34, 139, 34);
    rect(this.x, this.y, this.w, this.h);
  }
}
