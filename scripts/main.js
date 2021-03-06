var Player = new Paddle(50,100);
var Computer = new Paddle(800,100);
var ball = new Ball(450,255,5,0,"#0000ff");
var topPressed = false;
var bottomPressed = false;
var playerScore = 0;
var computerScore = 0;
var winningPoint = 11;
var gameEnded = false;

function init(){
  step();
  resetScore();
}

function step(){
  var canvasContent = getCanvasContent();
  canvasContent.clearRect(0, 0, "900", "510");
  draw();
}

function resetScore(){
  playerScore = 0;
  computerScore = 0;
  updateScore();
}

function getCanvasContent(){
  var canvas = getCanvas();
  return canvas.getContext("2d")
}



function draw(){
  var canvasContent = getCanvasContent();
  Player.render(canvasContent);
  Computer.render(canvasContent);
  ball.render(canvasContent);
  ball.move();
  Computer.update();
}

function updateScore(){
  var playerScoreHolder = document.getElementsByClassName("playerScore")[0].innerHTML = playerScore;
  var computerScoreHolder = document.getElementsByClassName("computerScore")[0].innerHTML = computerScore;
  if(playerScore == winningPoint || computerScore == winningPoint){
    var winner = playerScore == winningPoint? "Player"  : "Computer" ;
    document.getElementById("results").innerHTML = winner + " is the winner. Refresh to play again";
    resetScore();
    gameEnded = true;
    var canvasContent = getCanvasContent();
    canvasContent.clearRect(0, 0, "900", "510");
  }

}

function getCanvas(){
  return document.getElementById("main-canvas");
}


function Ball(x,y,x_speed,y_speed,color){
  this.color = color;
  this.x = x;
  this.y = y;
  this.x_speed = -x_speed;
  this.y_speed = -y_speed;
  this.render = function(canvasContent){
  canvasContent.beginPath();
  canvasContent.fillStyle = this.color;
  canvasContent.arc(this.x,this.y,20,0,Math.PI*2,true);
  canvasContent.fill();
  canvasContent.closePath();
  };
  this.move = function(){
   this.x += this.x_speed;
   this.y += this.y_speed;
   var top_x = this.x + 5;
   var top_y = this.y + 5;
   var bottom_x = this.x + 5;
   var bottom_y = this.y + 5;

   if(this.y - 5 < 0) {
     this.y = 5;
     this.y_speed = -this.y_speed;
   } else if(this.y + 5 > 510) {
     this.y = 505;
     this.y_speed = -this.y_speed;
   }

   if(this.x < 0 || this.x > 900) {
     if(this.x < 0){
       computerScore += 1;
     } else {
       playerScore += 1;
     }
     this.x_speed = -5;
     this.y_speed = 0;
     this.x = 450;
     this.y = 255;
    updateScore();
   }
   if(this.x < 75) {
     if(top_y < (Player.y + Player.height) && bottom_y > Player.y && top_x < (Player.x + Player.width) && bottom_x > Player.x) {
       // hit the player's paddle
       this.x_speed = 1;
       this.x_speed += (Player.x_speed / 2);
       this.y_speed += (Player.y_speed / 2);
       this.x += this.x_speed + 5;
      this.y += this.y_speed;
  }
   } else {
     if(top_y < (Computer.y + Computer.height) && bottom_y > Computer.y && top_x < (Computer.x + Computer.width) && bottom_x > Computer.x) {
       // hit the computer's paddle
       this.x_speed = -5;
       this.x_speed -= (Computer.x_speed / 2);
       this.y_speed -= (Computer.y_speed/2)
       this.x += this.x_speed - 10;
       this.y += this.y_speed;
     }
   }
  }
}

function Paddle(x,y){
  this.x = x;
  this.y = y;
  this.x_speed = 5;
  this.y_speed = 3;
  this.width = 30;
  this.height = 100;
  this.render = function(canvasContent){
    canvasContent.beginPath();
    canvasContent.rect(this.x,this.y,"30","100");
    canvasContent.fillStyle = "#000";
    canvasContent.fill();
    canvasContent.closePath();

  };
  this.move = function(){

    if(topPressed) {
    this.y += 12;
    }
    else if(bottomPressed) {
      this.y -= 12;
    }
    if(this.y > 3 && this.y < 409){
      //step();
    }

  }

}

Computer.update = function () {
    var x_pos = ball.x;
    var diff = -((this.x + (this.width / 2)) - x_pos);
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.move();
    if (this.y < 0) {
        this.y = 0;
    } else if (this.y + this.width > 400) {
        this.y = 400 - this.width;
    }
};

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        topPressed = true;
    }
    else if(e.keyCode == 40) {
        bottomPressed = true;
    }
    Player.move();
}

function keyUpHandler(e) {
  if(e.keyCode == 38) {
      topPressed = false;
  }
  else if(e.keyCode == 40) {
      bottomPressed = false;
  }
}

  setInterval(gameCheck, 25);

function gameCheck(){
  if (!gameEnded){
    step();
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
