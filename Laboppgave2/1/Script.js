const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
const pointsSource = document.getElementById('points');
const kxSource = document.getElementById('kx');

let centerX = c.width / 2; // X center of circle
let centerY = c.height / 2; // Y center of circle
let size = 550; // Circle size
let r = size / 2; // Radius of circle
let result = 0; // Number of points in circle
let points = []; // Array of all points on circle

// Calculate circle and draw it to canvas
const calculateCircle = (v) => {
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
};

// Draw art to canvas
const drawArt = (kx) => {
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
};

// Draw lines between circle points
const drawCircle = (x, y) => {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.lineTo(x, y);
	ctx.stroke();
};

// Draw lines for art
const drawLine = (array, from, to) => {
	ctx.beginPath();
	ctx.moveTo(array[from].x, array[from].y);
	ctx.lineTo(array[to].x, array[to].y);
	ctx.stroke();
};

// Number of points input
pointsSource.addEventListener('input', function (event) {
	ctx.clearRect(0, 0, 600, 600); // Clear previous canvas at input change
	points = []; // Empty circle points array
	result = event.target.value; // Number of points
	calculateCircle(result); // Calculate and draw new circle
});

// Kx input
kxSource.addEventListener('input', function (event) {
	ctx.clearRect(0, 0, 600, 600); // Clear previous canvas at input change
	calculateCircle(result); // Redraw circle
	let res = event.target.value; // Kx
	drawArt(res); // Draw art with kx input
});

// Change page on button click
const swapPage = (x) => {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
};
