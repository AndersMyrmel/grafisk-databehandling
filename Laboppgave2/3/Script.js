const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

let points = {
	x0: 0,
	y0: 0,
	x1: 100,
	y1: 0,
	x2: 100,
	y2: 100,
	x3: 0,
	y3: 100,
};
let backwards = true;
let p = 0.1;
let previousX = 0;
let previousY = 0;
let numberOfSquaresWithin = 20;

for (let rows = 0; rows < 6; rows++) {
	for (let cols = 0; cols < 6; cols++) {
		points = updateRowCols(cols, rows, points);
		drawSquare(
			[points.x0, points.y0],
			[points.x1, points.y1],
			[points.x2, points.y2],
			[points.x3, points.y3]
		);

		if (!backwards) {
			p = 0.9;
			backwards = true;
		} else {
			p = 0.1;
			backwards = false;
		}

		for (let i = 0; i <= numberOfSquaresWithin; i++) {
			points = getNewSquare(points);
			drawSquare(
				[points.x0, points.y0],
				[points.x1, points.y1],
				[points.x2, points.y2],
				[points.x3, points.y3]
			);
		}
	}
}

// Calcuate row and col position for the 36 squares
function updateRowCols(cols, rows, points) {
	points.x0 = cols * 100;
	points.y0 = rows * 100;
	points.x1 = 100 + cols * 100;
	points.y1 = rows * 100;
	points.x2 = 100 + cols * 100;
	points.y2 = 100 + rows * 100;
	points.x3 = cols * 100;
	points.y3 = 100 + rows * 100;
	return points;
}

// Caclulate coordinates for new square within previous square
// x = (1 - p) * x0 + p * x1, p ∈ [0,1]
function getNewSquare(points) {
	previousX = points.x0;
	previousY = points.y0;
	points.x0 = (1 - p) * points.x0 + p * points.x1;
	points.y0 = (1 - p) * points.y0 + p * points.y1;
	points.x1 = (1 - p) * points.x1 + p * points.x2;
	points.y1 = (1 - p) * points.y1 + p * points.y2;
	points.x2 = (1 - p) * points.x2 + p * points.x3;
	points.y2 = (1 - p) * points.y2 + p * points.y3;
	points.x3 = (1 - p) * points.x3 + p * previousX;
	points.y3 = (1 - p) * points.y3 + p * previousY;
	return points;
}

// Draw square between four x,y coordinates
function drawSquare(corner1, corner2, corner3, corner4) {
	ctx.beginPath();
	ctx.moveTo(corner1[0], corner1[1]);
	ctx.lineTo(corner2[0], corner2[1]);
	ctx.lineTo(corner3[0], corner3[1]);
	ctx.lineTo(corner4[0], corner4[1]);
	ctx.closePath();
	ctx.stroke();
}

// change page on button click
function swapPage(x) {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
}
