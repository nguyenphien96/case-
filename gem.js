
let canvas = document.getElementById('myCanvas1');
let ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 95;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4; // dòng
let brickColumnCount = 8; // hàng
let brickWidth = 75;  // chiều rộng
let brickHeight = 25; // chiều ddài
let brickPadding = 20; // khoảng cách giữa các ô
let brickOffsetTop = 25;
let brickOffsetLeft = 25;
let bricks = [];
let score = 0;
let lives = 2;


for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = []
    for (let r = 0; r < brickRowCount; r++) {
        bricks[i][r] = { x: 0, y: 0, status: 1 }
    }
}

function collistionDetection() {    // phát hiện va chạm
    for (let i = 0; i < brickColumnCount; i++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[i][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0
                    score++
                    if (score === brickColumnCount * brickRowCount) {
                        alert('Win Roài !!! Bạn siêu qué! ' + (score + lives) + 'Gạch Luôn');
                        document.location.reload()
                    }
                }
            }


        }
    }
}

function drawBricks() { // vẽ khối

    for (let i = 0; i < brickColumnCount; i++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[i][r].status === 1) {
                let bricksX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let bricksY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[i][r].x = bricksX;
                bricks[i][r].y = bricksY;

                ctx.beginPath();
                ctx.rect(bricksX, bricksY, brickWidth, brickHeight);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {  // hiển thị điểm
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Score:' + score, 8, 20);

}

function drawLives() { // hiển thị mạng
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Lives:' + lives, canvas.width - 65, 20);

}


function drawBall() { // vẽ khối tròn

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;

}

document.addEventListener('keydown', keyDownHandler, false); // sự kiện phím
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);// sự kiện chuột

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }

}

function drawPaddle() { // vẽ ván đẩy
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}


function draw() { // hiển thị

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawBricks()
    drawPaddle()
    drawScore()
    drawLives()
    collistionDetection()
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y -= paddleHeight) {
                dy = -dy
            }
        } else {
            lives--;
            if (lives === 0) {
                window.location.reload();
                alert('Thua rùi !!! ' + 'Gà quá bạn uiii :((' + score + ' Gạch Thuii');
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
            setInterval(draw,10)

        }

    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
    } else if (leftPressed && paddleX >0) {
        paddleX -= 10;
    }
}

draw()