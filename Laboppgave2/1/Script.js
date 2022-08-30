const c = document.getElementById('myCanvas');
const source = document.getElementById('points');
const ctx = c.getContext('2d');

let centerX = c.width / 2; // x center av sirkelen
let centerY = c.height / 2; // y center av sirkelen
let size = 550; // størrelse på sirkel
let r = size / 2; // radius

function calculateCircle(v) {
	const startx = r * Math.cos(0 * (Math.PI / (v / 2))) + centerX;
	const starty = r * Math.sin(0 * (Math.PI / (v / 2))) + centerY;
	ctx.beginPath();
	ctx.moveTo(startx, starty);

	for (let i = 0; i < v; i++) {
		let angle = i * (Math.PI / (v / 2));
		let x = r * Math.cos(angle) + centerX;
		let y = r * Math.sin(angle) + centerY;
		draw(x, y);
	}
	draw(startx, starty);
}

function draw(x, y) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 3;
	ctx.lineTo(x, y);
	ctx.stroke();
}

source.addEventListener('input', function (event) {
	ctx.clearRect(0, 0, 600, 600); // clear previous canvas at start of every update
	let result = event.target.value;
	calculateCircle(result);
});

// change page on button click
function swapPage(x) {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
}
