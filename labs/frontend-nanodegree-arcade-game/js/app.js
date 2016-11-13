// Render Canvas Engine
// It would be better .getBoundingClientRect()
// Dont have access to global.ctx now
var canvas = {
  width: 101 * 5, //5 columns
  height: 83 * 6, //6 rows
  square: {
    width: 101,
    height: 83
  }
};

var playing = true;



// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.x = 0 - canvas.square.width;
  this.y = (function() {
    var max = 4,
        min = 1;

    //we get random number between 1 and 4(exclusive)
    // and then multiply by sqaure height
    return (Math.floor(Math.random() * (max - min)) + min) * canvas.square.height;
  })();

  this.speed = Math.floor(Math.random() * (150 - 50) + 50);

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (playing) {
    this.x = this.x + Math.round(this.speed * dt);
    if (this.x > canvas.width) {
      this.resetData();
    }
  }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // ctx.fillStyle = "#ff0";
  // ctx.fillRect(this.x,this.y,101,83);
};

Enemy.prototype.resetData = function() {
  this.speed = Math.floor(Math.random() * (150 - 50) + 50);

  this.x = 0 - canvas.square.width;
  this.y = (function() {
    var max = 4,
        min = 1;

    //we get random number between 1 and 4(exclusive)
    // and then multiply by sqaure height
    return (Math.floor(Math.random() * (max - min)) + min) * canvas.square.height;
  })();
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.currentMove;
  this.y = canvas.square.height * 5; //height * columns last column

  this.x = (function() {
    var max = 5,
        min = 0;

    //we get random number between 1 and 4(exclusive)
    // and then multiply by sqaure height
    return (Math.floor(Math.random() * (max - min)) + min) * canvas.square.width;
  })();

}

Player.prototype.update = function() {
  var i,
      playerL = this.x,
      playerT = this.y,
      playerR = this.x + 70,
      playerB = this.y + 82,
      that = this;


  if (this.y == 0) {
    setTimeout(function(){that.resetData()},10);
  }

  for (i = 0; i < allEnemies.length; i++) {
    var enemy = allEnemies[i],
        enemyT = enemy.y,
        enemyL = enemy.x,
        enemyR = enemyL + 90,
        enemyB = enemyT + 82;

    if (playerT <= enemyB && playerB >= enemyT && playerR >= enemyL && playerL <= enemyR) {
      playing = false;
      setTimeout(function(){that.resetData()},300);
    }
  }

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // ctx.fillStyle = "#f00";
  // ctx.fillRect(this.x,this.y,101,83);
};

Player.prototype.checkCollision = function() {

  // body...
};

Player.prototype.handleInput = function(code) {
  switch (code) {
    case 'left':
      this.x = (this.x - canvas.square.width >= 0) ? this.x - canvas.square.width : this.x;
      break;
    case 'up':
      this.y = (this.y - canvas.square.height >= 0) ? this.y - canvas.square.height : this.y;
      break;
    case 'right':
      this.x = (this.x + canvas.square.width < canvas.width) ? this.x + canvas.square.width : this.x;
      break;
    case 'down':
      this.y = (this.y + canvas.square.height < canvas.height) ? this.y + canvas.square.height : this.y;
      break;
    default:
      break;
  }
};

Player.prototype.resetData = function() {
  this.y = canvas.square.height * 5; //height * columns
  this.x = (function() {
    var max = 5,
        min = 0;

    //we get random number between 1 and 4(exclusive)
    // and then multiply by sqaure height
    return (Math.floor(Math.random() * (max - min)) + min) * canvas.square.width;
  })();

  playing = true;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [],
    player = new Player();


var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  if (playing) {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});
