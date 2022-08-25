function draw() {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	drawMountain(ctx);
	drawSun(ctx);
	drawRoof(ctx, 50, 220, 400, 500, 60);
	drawHouse(ctx);
	drawWindow(ctx, 160, 270); // left window
	drawWindow(ctx, 360, 270); // right window
	drawDoor(ctx);
}

function drawMountain(ctx) {
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(20, 50);
	ctx.lineTo(200, 120);
	ctx.lineTo(400, 40);
	ctx.lineTo(550, 80);
	ctx.stroke();
}

function drawSun(ctx) {
	ctx.fillStyle = '#ffff00';
	ctx.beginPath();
	ctx.arc(200, 55, 35, 0, 2 * Math.PI);
	ctx.fill();
}

function drawRoof(ctx, x, y, a, b, h) {
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + (b - a) / 2, y - h);
	ctx.lineTo(x + (b - a) / 2 + a, y - h);
	ctx.lineTo(x + b, y);
	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.fill();
}

function drawHouse(ctx) {
	ctx.fillStyle = '#00FF00';
	ctx.strokeStyle = '#00FF00';
	ctx.beginPath();
	ctx.moveTo(100, 220);
	ctx.lineTo(100, 450);
	ctx.lineTo(490, 450);
	ctx.lineTo(490, 220);
	ctx.stroke();
	ctx.fill();
}

function drawWindow(ctx, x, y) {
	ctx.fillStyle = 'yellow';
	ctx.strokeStyle = 'yellow';
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x, y + 60);
	ctx.lineTo(x + 60, y + 60);
	ctx.lineTo(x + 60, y);
	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.fill();
}

function drawDoor(ctx) {
	ctx.fillStyle = 'pink';
	ctx.strokeStyle = 'pink';
	ctx.beginPath();
	ctx.moveTo(250, 350);
	ctx.lineTo(250, 450);
	ctx.lineTo(320, 450);
	ctx.lineTo(320, 350);
	ctx.lineTo(250, 350);
	ctx.stroke();
	ctx.fill();
}

// change page on button click
function swapPage() {
	window.location.href = '../2/Index.html';
	return false; // prevent false navigation
}

draw();
