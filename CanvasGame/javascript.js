//Создание канваса
var canvas = document.getElementById('myCanvas');
//Запись в переменную канвасу, чтобы пользоваться ссылкой
var ctx = canvas.getContext('2d');
//Координаты мяча
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//Определяем координаты весла(падл)
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
//В начале кнопки весла не нажимаются, поэтому фолс
var rightPressed = false;
var leftPressed = false;
//Рисуем круг
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#f21111";
  ctx.fill();
  ctx.closePath();
}
//Рисуем падл
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#287fbd";
  ctx.fill();
  ctx.closePath();

}
//Функция рисования
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

//Касание о стены y по высоте, х по ширине
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if (x + paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }
    else{
      alert("ИГРА ОКОНЧЕНА!");
      document.location.reload();
    }
  }

//Физика весла
  if (rightPressed && paddleX < canvas.width-paddleWidth){
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;

}
//Прослушиватели событий
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//Функции для весла, когда нажимаем кнопку
function keyDownHandler(e) {
  if (e.keyCode == 39){
    rightPressed = true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
}
//Функции для весла, когда отпускаем кнопку
function keyUpHandler(e) {
  if (e.keyCode == 39){
    rightPressed = false;
  }
  else if(e.keyCode == 37){
    leftPressed = false;
  }
}
setInterval(draw, 10);
