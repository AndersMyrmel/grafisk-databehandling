const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const width = c.width;
const height = c.height;

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

originalPosition(); // initialize starting position

// update circle and lines on mouse movement
function draw() {
	ctx.clearRect(0, 0, width, height); // clear previous canvas at start of every draw frame
	ctx.fillStyle = 'black';
	ctx.beginPath();
	drawRect(ctx);
	drawLine(ctx, leftLine.x, leftLine.y, leftLine.yChange, leftLine.xChange); // left line
	drawLine(ctx, rightLine.x, rightLine.y, rightLine.yChange, rightLine.xChange); // right line
	ctx.arc(circle.x, circle.y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
}

// starting position for circle and lines
function originalPosition() {
	ctx.clearRect(0, 0, width, height);
	drawRect(ctx);
	drawLineStart(ctx, 150, 325); // left line starting position
	drawLineStart(ctx, 300, 325); // right line starting position
	ctx.arc(300, 325, 5, 0, 2 * Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
}

// draw red rectangle background
function drawRect(ctx) {
	ctx.fillStyle = 'red';
	ctx.fillRect(150, 200, 300, 250); // x, y, width, height
	ctx.closePath();
}

// draw starting position for line
function drawLineStart(ctx, x, y) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 150, y);
	ctx.stroke();
}

// update line on movement
function drawLine(ctx, x, y, yChange, xChange) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - xChange, y - yChange);
	ctx.stroke();
	ctx.closePath();
}

// register mouseclick on circle
c.addEventListener('mousedown', function (event) {
	let currx = event.clientX - c.offsetLeft;
	let curry = event.clientY - c.offsetTop;
	if (ctx.isPointInPath(currx, curry)) {
		document.body.addEventListener('mousemove', onMouseMove);
		document.body.addEventListener('mouseup', onmouseUp);
	}
});

// change cursor on circle hover
c.addEventListener('mousemove', function (event) {
	let currx = event.clientX - c.offsetLeft;
	let curry = event.clientY - c.offsetTop;
	if (ctx.isPointInPath(currx, curry)) {
		c.style.cursor = 'pointer';
	} else {
		c.style.cursor = 'auto';
	}
});

// update circle and line position on mouse movement
function onMouseMove(event) {
	circle.x = event.clientX - c.offsetLeft; // set new circle x pos
	circle.y = event.clientY - c.offsetTop; // set new circle y pos
	rightLine.yChange = rightLine.y - circle.y;
	rightLine.xChange = rightLine.x - circle.x;
	leftLine.yChange = leftLine.y - circle.y;
	leftLine.xChange = leftLine.x - circle.x;
	draw();
	// check wheter circle is dragged out of red rectangle
	if (outOfBounds(circle.x, circle.y)) {
		onmouseUp();
	}
}

// on mouse click release revert back to starting position
function onmouseUp(event) {
	document.body.removeEventListener('mousemove', onMouseMove);
	document.body.removeEventListener('mouseup', onmouseUp);
	originalPosition();
}

// check wheter mouse drag is out of bounds
function outOfBounds(x, y) {
	if (y <= 200 || y >= 450 || x <= 150 || x >= 450) {
		return true;
	}
}

// change page on button click
function swapPage() {
	window.location.href = '../1/Index.html';
	return false; // prevent false navigation
}
