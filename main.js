var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = canvas.width/48;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var paddleHeight = canvas.width/48;
var paddleWidth = canvas.width/6.4;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = canvas.width/6.4;
var brickHeight = canvas.width/24;
var brickPadding = canvas.width/48;
var brickOffsetTop = canvas.width/16;
var brickOffsetLeft = canvas.width/16;
var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
var bricks = [];
var colour1 = "#0095DD";
var colour2 = "#AB4FD1";
var colour = "#0095DD";
var score = 0;
var background = new Image();
var lives = 3;

// background.src = "https://1.bp.blogspot.com/-hs2fckXJBkE/W5obuBm9kII/AAAAAAAAB38/C89KFBJCIlEwfl-g8d-T1Cu4cHFWjYI2QCLcBGAs/s1600/breakoutbg.png";
// var play = new Image();
// play.src = "https://1.bp.blogspot.com/-fVAKH-3TLuo/W5onDDHje0I/AAAAAAAAB4I/q2ooE6GuzQkS80dtw1JILXjFWdfQ3IKkwCLcBGAs/s1600/breaoutplay.png";

// var startBtn = document.getElementById('startBtn');



for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

function drawCanvas() {
  ctx.beginPath();
  ctx.drawImage(background, 0, 0);
  ctx.fill();
  ctx.closePath();

}

function drawPlay() {
  ctx.beginPath();
  ctx.drawImage(play, 50, 50);
  ctx.fill();
  clickable;
  ctx.closePath();

}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startBtn.style.display = 'none';

  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  drawBricks();
  drawLives();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } 
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      colour = colour1;

    } 
    else {
      lives--;
      if(!lives) {
        document.location.reload();
        alert("GAME OVER");
        clearInterval(interval);
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
        colour = colour1;
      }
    }
  }


    x += dx;
    y += dy;

    if (rightPressed) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }
    requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("touch", touchMoveHandler, false);



  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }
  function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
      }
    }
    function touchMoveHandler(e) {
      var relativeX = e.touchesX - canvas.offsetLeft;
      if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
      }
    }


  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            colour = colour2;
            score++;
            if (score == brickRowCount * brickColumnCount) {
              alert("YOU WIN, CONGRATULATIONS!");
              document.location.reload();
              clearInterval(interval); // Needed for Chrome to end game
            }




          }
        }
      }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }
  drawCanvas();
  drawPlay();
  draw();
  var interval = setInterval(draw, 10);

