function draw() {
	var c = document.getElementById('myCanvas');

	var ctx = c.getContext('2d');
	drawSquare(ctx);
	drawLine(ctx, 150, 325); // left line
	drawLine(ctx, 300, 325); // right line
	drawCircle(ctx);
}

function drawSquare(ctx) {
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(150, 200);
	ctx.lineTo(150, 450);
	ctx.lineTo(450, 450);
	ctx.lineTo(450, 200);
	ctx.lineTo(150, 200);
	ctx.stroke();
	ctx.fill();
}

function drawLine(ctx, x, y) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 150, y);
	ctx.stroke();
}

function drawCircle(ctx) {
	document.getElementById('myCanvas').style.cursor = 'auto';
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.arc(300, 325, 5, 0, 2 * Math.PI);
	ctx.fill();
}

function swapPage() {
	window.location.href = '../1/Oppgave1.html';
	return false;
}

draw();
