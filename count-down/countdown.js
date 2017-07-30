var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 500;

var R = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date();
var currentShowTime = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  currentShowTime = getCurrentShowTime();

  setInterval(function () {
    // currentShowTime = getCurrentShowTime();
    update();
    render(context);
  }, 200)
}

function getCurrentShowTime() {
  var currentTime = new Date();
  var ret = endTime.getTime() + 1000 * 60 * 60 * 24 - currentTime.getTime();
  ret = Math.round(ret/1000);

  return ret >= 0 ? ret : 0;
}

function update () {
  var nexShowTime = getCurrentShowTime();

  var nexthour = parseInt(nexShowTime/3600);
  var nextminutes = parseInt((nexShowTime - nexthour * 3600) / 60);
  var nextseconds = parseInt(nexShowTime % 60);
  
  var hour = parseInt(currentShowTime/3600);
  var minutes = parseInt((currentShowTime - hour * 3600) / 60);
  var seconds = parseInt(currentShowTime % 60);

  if (nextseconds !== seconds) {
    if (parseInt(nexthour/10) != parseInt(hour/10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nexthour/10))
    }
    if (parseInt(nexthour%10) != parseInt(hour%10)) {
      addBalls(MARGIN_LEFT + 15 * (R+1), MARGIN_TOP, parseInt(nexthour%10))
    }

    if (parseInt(nextminutes/10) != parseInt(minutes/10)) {
      addBalls(MARGIN_LEFT + 38 * (R+1), MARGIN_TOP, parseInt(nextminutes/10))
    }
    if (parseInt(nextminutes%10) != parseInt(minutes%10)) {
      addBalls(MARGIN_LEFT + 53 * (R+1), MARGIN_TOP, parseInt(nextminutes%10))
    }

    if (parseInt(nextseconds/10) != parseInt(seconds/10)) {
      addBalls(MARGIN_LEFT + 76 * (R+1), MARGIN_TOP, parseInt(nextseconds/10))
    }
    if (parseInt(nextseconds%10) != parseInt(seconds%10)) {
      addBalls(MARGIN_LEFT + 91 * (R+1), MARGIN_TOP, parseInt(nextseconds%10))
    }

    currentShowTime = nexShowTime;
  }

  updateBalls();
}

function render(ctx) {
  ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  var hour = parseInt(currentShowTime/3600);
  var minutes = parseInt((currentShowTime - hour * 3600) / 60);
  var seconds = parseInt(currentShowTime % 60);

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour/10), ctx);
  renderDigit(MARGIN_LEFT + 15 * (R+1), MARGIN_TOP, parseInt(hour%10), ctx);
  renderDigit(MARGIN_LEFT + 30 * (R+1), MARGIN_TOP, 10, ctx);
  renderDigit(MARGIN_LEFT + 38 * (R+1), MARGIN_TOP, parseInt(minutes/10), ctx);
  renderDigit(MARGIN_LEFT + 53 * (R+1), MARGIN_TOP, parseInt(minutes%10), ctx);
  renderDigit(MARGIN_LEFT + 68 * (R+1), MARGIN_TOP, 10, ctx);
  renderDigit(MARGIN_LEFT + 76 * (R+1), MARGIN_TOP, parseInt(seconds/10), ctx);
  renderDigit(MARGIN_LEFT + 91 * (R+1), MARGIN_TOP, parseInt(seconds%10), ctx);

  renderBalls(ctx);
}

function addBalls (x, y, num) {
  // console.log(num)
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        var aBall = {
          x: x + j * 2 * (R + 1) + (R + 1),
          y: y + i * 2 * (R + 1) + (R + 1),
          g: Math.round(Math.random() * (15 - 10)) + 10,
          vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 15,
          vy:-20,
          color: colors[Math.floor(Math.random() * colors.length)]
        };

        balls.push(aBall);
      }
    }
  }
}

function updateBalls () {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx
    balls[i].y += balls[i].vy
    balls[i].vy += balls[i].g

    if (balls[i].y >= WINDOW_HEIGHT - R) {
      balls[i].y = WINDOW_HEIGHT - R;
      balls[i].vy = - balls[i].vy * 0.5;
    }
  }

  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].x - R > 0 && balls[i].x + R < WINDOW_WIDTH) {
      balls[cnt++] = balls[i]
    }
  }

  while (balls.length > cnt) {
    balls.pop();
  }

  console.log(balls.length)
}

function renderBalls (ctx) {
  for (var i = 0; i < balls.length; i++) {
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fillStyle = balls[i].color;
    ctx.fill();
  }
}

function renderDigit (x, y, num, ctx) {
  ctx.fillStyle = "rgb(0, 102, 153)";

  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        ctx.beginPath();
        ctx.arc(x + j * 2 * (R + 1) + (R + 1), y + i * 2 * (R + 1) + (R + 1), R, 0, 2 * Math.PI);
        ctx.closePath();

        // ctx.fillStyle = "rgb("+getRgb(230, 250)+", "+getRgb(130, 150)+", "+getRgb(190, 210)+")";

        ctx.fill();
      }
    }
  }
}

function getRgb (begin, to) {
  return Math.round(Math.random()*(to-begin)) + begin;
}