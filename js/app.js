let lives = 4 - 1;
let score = 0
let livesid = document.getElementById('lives');
let levelid = document.getElementById('score');

livesid.innerHTML = 'Lives: ' + lives;
levelid.textContent = 'Level: ' + score;

function updateLives() {
  lives--;
  livesid.innerHTML = 'Lives: ' + lives;
  if (lives < 1) {
    score = 0;
    levelid.textContent = 'Level: ' + score;
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 3) + 1;
    });
    lives = 4;
  }
}

function increaseLevel() {
  score++;
  levelid.textContent = 'Level: ' + score;
  if (score === 2) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 4) + 1;
    });
  }

  if (score === 3) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 2;
    });
  }

  if (score === 4) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 3;
    });
  }

  if (score === 5) {
    allEnemies.forEach(function (Enemy) {
      Enemy.speed = Math.floor(Math.random() * 5) + 4;
    });
  }
}

class Sun {
  constructor() {
    this.x = 400;
    this.y = 0;
  }
}

class Enemy {
  constructor(x, y, direction, style) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = Math.floor(Math.random() * 3) + 2;
  };

  update(dt) {
    this.x * dt;
    if (this.style === 'enemy1' && this.style === 'enemy2' && this.style === 'enemy3' || this.x >= 775) {
      this.x = 775;
      this.direction = 'rtl'
    };

    if (this.x <= 0) {
      this.x = 0;
      this.direction = 'ltr';
    };

    if (this.direction === 'ltr') {
      this.x = this.x + this.speed;
    } else {
      this.x = this.x - this.speed;
    };

    allEnemies.forEach(function (Enemy) {
      if (collision(Enemy, player)) {
        player.x = 400;
        player.y = 425;
        updateLives();
      }
    });
  }
}

class Player {
  constructor() {
    this.x = 400;
    this.y = 425;
  }
  update() {
    if (collision(sun, player)) {
      this.x = 400;
      this.y = 425;
      increaseLevel();
    }
  }
  handleInput() {
    restriction();
  }
}

const player = new Player;
const sun = new Sun;

function restriction(keystring) {
  if (keystring === 'left') {
    player.x = player.x - 40;
    if (player.x <= 0) {
      player.x = 0;
    }
  };
  if (keystring === 'right') {
    player.x = player.x + 40;
    if (player.x >= 900 - 95) {
      player.x = 800;
    }
  };
  if (keystring === 'up') {
    player.y = player.y - 40;
    if (player.y < 0) {
      player.y = 0;
    }
  };
  if (keystring === 'down') {
    player.y = player.y + 40;
    if (player.y > 425) {
      player.y = 425;
    }
  };
}

const ene1 = new Enemy(0, 10, 'ltr', 'enemy1');
const ene2 = new Enemy(0, 150, 'ltr', 'enemy2');
const ene3 = new Enemy(0, 260, 'ltr', 'enemy3');

const allEnemies = [];
allEnemies.push(ene1, ene2, ene3);

function collision(rect1, rect2) {
  return !(rect1.x > (rect2.x + 80) ||
    (rect1.x + 80) < rect2.x ||
    rect1.y > (rect2.y + 80) ||
    (rect1.y + 80) < rect2.y);
}

for (let i = 0; i < allEnemies.length; i++) {
  allEnemies[i].update(1);
}

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  restriction(allowedKeys[e.keyCode]);
});

