const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const DINO_WIDTH = 40;
const DINO_HEIGHT = 60;
const CACTUS_WIDTH = 20;
const CACTUS_HEIGHT = 40;

let score = 0;
let highScore = 0;
let speed = 5;
let dinoY = canvas.height - DINO_HEIGHT - 20;
let dinoYSpeed = 0;
let cactusX = canvas.width;
let cactusYSpeed = 0;

function drawDino(x, y) {
	ctx.fillStyle = 'green';
	ctx.fillRect(x, y, DINO_WIDTH, DINO_HEIGHT);
}

function drawCactus(x, y) {
	ctx.fillStyle = 'brown';
	ctx.fillRect(x, y, CACTUS_WIDTH, CACTUS_HEIGHT);
}

function drawScore() {
	ctx.fillStyle = 'black';
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, 10, 25);
	ctx.fillText(`High Score: ${highScore}`, 10, 50);
}

function update() {
	// Move dino
	dinoY += dinoYSpeed;
	dinoYSpeed += 1;
	if (dinoY > canvas.height - DINO_HEIGHT - 20) {
		dinoY = canvas.height - DINO_HEIGHT - 20;
		dinoYSpeed = 0;
	}

	// Move cactus
	cactusX -= speed;
	if (cactusX < -CACTUS_WIDTH) {
		cactusX = canvas.width;
		cactusYSpeed = Math.random() * 4 - 2;
	}

	// Check for collision
	if (cactusX < DINO_WIDTH && cactusX + CACTUS_WIDTH > 0 && dinoY + DINO_HEIGHT > canvas.height - CACTUS_HEIGHT) {
		if (score > highScore) {
			highScore = score;
		}
		score = 0;
		speed = 5;
		cactusX = canvas.width;
		dinoY = canvas.height - DINO_HEIGHT - 20;
		dinoYSpeed = 0;
	}

	score++;
	speed += 0.001;

	// Draw everything
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawDino(50, dinoY);
	drawCactus(cactusX, canvas.height - CACTUS_HEIGHT + cactusYSpeed);
	drawScore();

	// Repeat
	requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
	if (event.code === 'Space') {
		if (dinoY === canvas.height - DINO_HEIGHT - 20) {
			dinoYSpeed = -15;
		}
	}
});

update();
