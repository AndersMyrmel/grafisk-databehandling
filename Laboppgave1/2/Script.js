var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var width = c.width;
var height = c.height;

let circle = {
	x: 300,
	y: 325,
};

let leftLine = {
	y: 325,
	x: 150,
	yChange: 0,
	xChange: 0,
};

let rightLine = {
	y: 325,
	x: 450,
	yChange: 0,
	xChange: 0,
};

originalPosition();

function draw() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = 'black';
	ctx.beginPath();
	drawRect(ctx);
	drawLeftLine(ctx, leftLine.x, leftLine.y, leftLine.yChange, leftLine.xChange);
	drawRightLine(
		ctx,
		rightLine.x,
		rightLine.y,
		rightLine.yChange,
		rightLine.xChange
	);

	ctx.arc(circle.x, circle.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
}

function originalPosition() {
	ctx.clearRect(0, 0, width, height);
	drawRect(ctx);
	drawLineStart(ctx, 150, 325); // left line
	drawLineStart(ctx, 300, 325); // right line
	ctx.arc(300, 325, 5, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
}

function drawRect(ctx) {
	ctx.fillStyle = 'red';
	ctx.fillRect(150, 200, 300, 250);
	ctx.closePath();
}

function drawLineStart(ctx, x, y) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 150, y);
	ctx.stroke();
}

function drawLeftLine(ctx, x, y, yChange, xChange) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - xChange, y - yChange);
	ctx.stroke();
	ctx.closePath();
}

function drawRightLine(ctx, x, y, change, xChange) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - xChange, y - change);
	ctx.stroke();
	ctx.closePath();
}

c.addEventListener('mousedown', function (event) {
	var currx = event.clientX - c.offsetLeft;
	var curry = event.clientY - c.offsetTop;
	if (ctx.isPointInPath(currx, curry)) {
		document.body.addEventListener('mousemove', onMouseMove);
		document.body.addEventListener('mouseup', onmouseUp);
	}
});

c.addEventListener('mousemove', function (event) {
	var currx = event.clientX - c.offsetLeft;
	var curry = event.clientY - c.offsetTop;
	if (ctx.isPointInPath(currx, curry)) {
		c.style.cursor = 'pointer';
	} else {
		c.style.cursor = 'auto';
	}
});

function onMouseMove(event) {
	circle.x = event.clientX - c.offsetLeft;
	circle.y = event.clientY - c.offsetTop;
	rightLine.yChange = rightLine.y - circle.y;
	rightLine.xChange = rightLine.x - circle.x;
	leftLine.yChange = leftLine.y - circle.y;
	leftLine.xChange = leftLine.x - circle.x;
	draw();
	if (outOfBounds(circle.x, circle.y)) {
		onmouseUp();
	}
}

function onmouseUp(event) {
	document.body.removeEventListener('mousemove', onMouseMove);
	document.body.removeEventListener('mouseup', onmouseUp);
	originalPosition();
}

function outOfBounds(x, y) {
	if (y <= 200 || y >= 450 || x <= 150 || x >= 450) {
		return true;
	}
}

function swapPage() {
	window.location.href = '../1/Index.html';
	return false;
}
