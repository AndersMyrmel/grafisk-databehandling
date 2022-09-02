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
let p = 0.1;
let previousX = 0;
let previousY = 0;
let squaresWithin = 20;
let backwards = false;
let numOfRows = 4;
let rowsCount = 0;

// Draw squares within squares
const drawSqauresWithinSquares = (numOfSquares) => {
	for (let i = 0; i <= numOfSquares; i++) {
		points = getNewSquare(points); // Get (x,y) coordinates for the new square
		drawSquare(
			[points.x0, points.y0],
			[points.x1, points.y1],
			[points.x2, points.y2],
			[points.x3, points.y3]
		);
	}
};

// Calcuate row and col position for the 16 squares
const updateRowCols = (cols, rows, points, totalRows) => {
	const offset = (c.height * totalRows) / (totalRows * totalRows);
	points.x0 = cols * offset;
	points.y0 = rows * offset;
	points.x1 = offset + cols * offset;
	points.y1 = rows * offset;
	points.x2 = offset + cols * offset;
	points.y2 = offset + rows * offset;
	points.x3 = cols * offset;
	points.y3 = offset + rows * offset;
	return points;
};

// Caclulate coordinates for new square within previous square
// x = (1 - p) * x0 + p * x1, p ∈ [0,1]
const getNewSquare = (points) => {
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
};

// Draw square between four x,y coordinates
const drawSquare = (corner1, corner2, corner3, corner4) => {
	ctx.beginPath();
	ctx.moveTo(corner1[0], corner1[1]);
	ctx.lineTo(corner2[0], corner2[1]);
	ctx.lineTo(corner3[0], corner3[1]);
	ctx.lineTo(corner4[0], corner4[1]);
	ctx.closePath();
	ctx.stroke();
};

// Main loop responsible for drawing
for (let rows = 0; rows < numOfRows; rows++) {
	for (let cols = 0; cols < numOfRows; cols++) {
		points = updateRowCols(cols, rows, points, numOfRows); // Get (x,y) coordinates for square border
		// Draw square border
		drawSquare(
			[points.x0, points.y0],
			[points.x1, points.y1],
			[points.x2, points.y2],
			[points.x3, points.y3]
		);
		// Switch direction every new row
		if (rowsCount % numOfRows == 0) {
			backwards = !backwards;
		}
		// Switch direction every new square
		if (!backwards) {
			p = 0.9;
			backwards = !backwards;
		} else {
			p = 0.1;
			backwards = !backwards;
		}
		rowsCount++;
		drawSqauresWithinSquares(squaresWithin); // Draw squares within eachother
	}
}

// Change page on button click
function swapPage(x) {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
}
