var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height -30;
var vx = 2;
var vy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 8;
var brickHeight = 20;
var brickWidth = 75;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickoffsetLeft = 30;
var score = 0;
var lives = 3;
var sound = new sound('Explosion.mp3');

var bricks = [];
for(var i=0;i<brickColumnCount;i++){
    bricks[i]=[];
    for(var j=0;j<brickRowCount;j++){
      bricks[i][j]= { x:0,y:0,status: 1};
    }
}

var nbricks = [];
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute("preload","auto");
  this.sound.setAttribute("controls","none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key =="ArrowLeft"){
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetect() {
  for(var i=0;i<brickColumnCount;i++){
    for(var j=0;j<brickRowCount;j++){
      var b = bricks[i][j];
      if( b.status === 1){
      if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
        vy = -vy;
        b.status = 0;
        score++;
        sound.play();
        if(score === (brickColumnCount * brickRowCount)){
          sound.stop();
          alert('You have won');
          document.location.reload();
        }
      }
      }
    }
  }
}
function drawScore() {
    c.font = "16px Arial";
    c.fillStyle = "#0095DD";
    c.fillText("Score: "+score, 8, 20);
}
function drawBall() {
  c.beginPath();
  c.arc(x,y,ballRadius,0,Math.PI *2);
  c.fillStyle = "Blue";
  c.fill();
  c.closePath();
}
function drawPaddle() {
  c.beginPath();
  c.rect(paddleX,canvas.height - paddleHeight,paddleWidth,paddleHeight);
  c.fillStyle = "Blue";
  c.fill();
  c.closePath();
}
function drawBricks() {
  for(var i=0;i<brickColumnCount;i++){
    for(var j=0;j<brickRowCount;j++){
      if(bricks[i][j].status == 1){
      var brickX = (i*(brickWidth + brickPadding)) + brickoffsetLeft;
      var brickY = (j*(brickHeight + brickPadding)) + brickOffSetTop;
      bricks[i][j].x = brickX;
      bricks[i][j].y = brickY;
      c.beginPath();
      c.rect(brickX,brickY,brickWidth,brickHeight);
      c.fillStyle = "Blue";
      c.fill();
      c.closePath();
    }
    }
  }
}
function drawLives() {
  c.font = "16px Arial";
  c.fillStyle = "Blue";
  c.fillText("Lives: "+lives,canvas.width-65,20);
}
function draw() {
  c.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetect();
  drawScore();
  drawLives();
  if(x + vx >canvas.width - ballRadius || x + vx < ballRadius)
  {
    vx = -vx;
  }
  if(y + vy < ballRadius)
  {
    vy = -vy;
  }
  else if(y + vy > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      vy = -vy;
    }
    else{
      lives--;
      if(lives===0){
      alert('game is over');
      document.location.reload();
    }
    else {
      x = canvas.width/2;
      y = canvas.height -30;
      vx = 3;
      vy = -3;
      paddleX = (canvas.width-paddleWidth)/2;
    }
  }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
  paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
  paddleX -= 7;
}
  x+=vx;
  y+=vy;
  requestAnimationFrame(draw);
}

//draw();
