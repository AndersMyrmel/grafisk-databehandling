const c = document.getElementById('myCanvas');
const source = document.getElementById('points');
const ctx = c.getContext('2d');

let centerX = c.width / 2; // x center av sirkelen
let centerY = c.height / 2; // y center av sirkelen
let size = 550; // størrelse på sirkel
let r = size / 2; // radius
let points = []; // Array of all points on circle

function calculateCircle(v) {
	const startx = r * Math.cos(0 * (Math.PI / (v / 2))) + centerX;
	const starty = r * Math.sin(0 * (Math.PI / (v / 2))) + centerY;
	ctx.beginPath();
	ctx.moveTo(startx, starty);

	for (let i = 0; i < v; i++) {
		let angle = i * (Math.PI / (v / 2));
		let x = r * Math.cos(angle) + centerX;
		let y = r * Math.sin(angle) + centerY;
		drawCircle(x, y);
		points.push({ x, y });
	}
	drawCircle(startx, starty);
}

function drawArt(kx) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
	for (let index = 0; index < points.length; index++) {
		if (index == 0) {
			drawLine(points, index, 1);
		} else if (points[index * kx] !== undefined) {
			drawLine(points, index, index * kx);
		} else if (points[index * kx] == undefined) {
			drawLine(points, index, (index * kx) % points.length);
		}
	}
}

function drawLine(array, from, to) {
	ctx.beginPath();
	ctx.moveTo(array[from].x, array[from].y);
	ctx.lineTo(array[to].x, array[to].y);
	ctx.stroke();
	ctx.closePath();
}

function drawCircle(x, y) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.lineTo(x, y);
	ctx.stroke();
}

source.addEventListener('input', function (event) {
	ctx.clearRect(0, 0, 600, 600); // clear previous canvas at start of every update
	points = [];
	let result = event.target.value;
	calculateCircle(result);
});

// change page on button click
function swapPage(x) {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
}
