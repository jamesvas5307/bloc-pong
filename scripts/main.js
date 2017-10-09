function init(){
  styleCanvas();
}


function styleCanvas(){
  var canvas = getCanvas();
  var canvasContent = canvas.getContext("2d")
  //canvasContent.fillRect((50,100), 25, 150, 100);
  canvasStroke(canvasContent);
  var Player = new Paddle(50,100);
  var Computer = new Paddle(800,100);
  var ball = new Ball(300,300,"#ff0000");
  Player.render(canvasContent);
  Computer.render(canvasContent);
  ball.render(canvasContent);
}

function getCanvas(){
  return document.getElementById("main-canvas");
}

function canvasStroke(canvasContent){
  canvasContent.moveTo(900,500);
  canvasContent.lineTo(900,0);
  canvasContent.lineTo(0,0);
  canvasContent.lineTo(0,500);
  canvasContent.lineTo(900,500);

  canvasContent.strokeStyle = "#000";
  canvasContent.stroke();
}

function Ball(x,y,color){
  this.color = color;
  this.x = x;
  this. y = x;
  this.render = function(canvasContent){
  canvasContent.beginPath();
  canvasContent.fillStyle= this.color;
  canvasContent.arc(this.x,this.y,20,0,Math.PI*2,true);
  canvasContent.closePath();
  canvasContent.fill();
};
}

function Paddle(x,y){
  this.x = x;
  this.y = y;
  this.height = "100";
  this.width = "30";
  this.render = function(canvasContent){
    canvasContent.fillRect((this.x),(this.y),this.width,this.height);
  };
}
