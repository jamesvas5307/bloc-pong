var Player = new Paddle(50,100);
var Computer = new Paddle(800,100);
var ball = new Ball(300,300,"#0000ff");
var topPressed = false;
var bottomPressed = false;

function init(){
  step();
}

function step(){
  var canvasContent = getCanvasContent();
  canvasContent.clearRect(0, 0, "900", "510");
  draw();
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
}

function getCanvas(){
  return document.getElementById("main-canvas");
}


function Ball(x,y,color){
  this.color = color;
  this.x = x;
  this. y = x;
  this.render = function(canvasContent){
  canvasContent.beginPath();
  canvasContent.fillStyle = this.color;
  canvasContent.arc(this.x,this.y,20,0,Math.PI*2,true);
  canvasContent.fill();
  canvasContent.closePath();
};
}

function Paddle(x,y){
  this.x = x;
  this.y = y;
  this.render = function(canvasContent){
    canvasContent.beginPath();
    canvasContent.rect(this.x,this.y,"30","100");
    canvasContent.fillStyle = "#000";
    canvasContent.fill();
    canvasContent.closePath();

  };
  this.move = function(){

    if(topPressed) {
    this.y += 7;
    }
    else if(bottomPressed) {
      this.y -= 7;
    }
    if(this.y > 3 && this.y < 409){
      step();
    }

  }

}

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


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
