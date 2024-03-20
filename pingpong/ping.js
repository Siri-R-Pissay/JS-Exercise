const canvas = document.getElementById("table");
const ctx = canvas.getContext("2d");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 5,
    dy: 5,
    speed: 5,
    color: "yellow"
};

const redBase = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "red",
    speed: 10 
};

const bridge = {
    x: canvas.width / 2,
    y: 0,
    width: 2,
    height: canvas.height,
    color: "black",
    dashWidth: 10, // Width of each dash
    gapWidth: 5 // Width of each gap between dashes
};

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(redBase.score, canvas.width - 50, 50);
    ctx.fillText(redBase.score, 50, 50);
}

function drawBridge() {
    ctx.beginPath();
    ctx.strokeStyle = "pink";
    ctx.setLineDash([bridge.dashWidth, bridge.gapWidth]);
    ctx.moveTo(bridge.x, bridge.y);
    ctx.lineTo(bridge.x, bridge.y + bridge.height);
    ctx.stroke();
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bridge
    drawBridge();

    // Draw red base
    drawRect(redBase.x, redBase.y, redBase.width, redBase.height, redBase.color);

    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    // Draw score
    drawScore();
}

function update() {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Move red base to cover the ball
    if (ball.y < redBase.y + redBase.height / 2) {
        redBase.y -= redBase.speed;
    } else if (ball.y > redBase.y + redBase.height / 2) {
        redBase.y += redBase.speed;
    }

    // Collision detection with red base
    if (ball.x + ball.radius >= redBase.x && 
        ball.y >= redBase.y && 
        ball.y <= redBase.y + redBase.height) {
        ball.dx = -ball.dx;
    }

    // Collision detection with top and bottom walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy = -ball.dy;
    }

    // Ball out of bounds
    if (ball.x - ball.radius <= 0) {
        // Red base scores
        redBase.score++;
        reset();
    } else if (ball.x + ball.radius >= canvas.width) {
        // Game over (You can implement game over logic here)
        reset();
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = Math.random() < 0.5 ? -ball.speed : ball.speed;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
