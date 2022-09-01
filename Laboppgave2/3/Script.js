const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

// x = (1-p) * x0 + P*x1
// y = (1-p) * y0 + P*y1
// p ∈ [0,1]

let x0 = 300;
let y0 = 150;
let x1 = 300;
let y1 = 450;

for (let i = 0.1; i < 1; i += 0.1) {
	let x = (1 - i) * x0 + i * x1;
	let y = (1 - i) * y0 + i * y1;
	drawRect(x1, y1, x, y);
	console.log(x, y);
	x1 = x;
	y1 = y;
}

//let x = (10 - 1) * x0 + 1 * x1;
//let y = (10 - 1) * y0 + 1 * y1;
//console.log(x, y);

//drawRect(x0, y0, x1, y1);

function drawRect(x0, y0, x1, y1) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(y0, x1);
	ctx.lineTo(x0, y1);
	ctx.lineTo(y1, x0);
	ctx.closePath();
	ctx.stroke();
}

c.onmousemove = function (e) {
	var pos = getMousePos(this, e), /// provide this canvas and event
		x = pos.x,
		y = pos.y;
	console.log(pos);

	/// check x and y against the grid
};

function getMousePos(canvas, e) {
	/// getBoundingClientRect is supported in most browsers and gives you
	/// the absolute geometry of an element
	var rect = canvas.getBoundingClientRect();

	/// as mouse event coords are relative to document you need to
	/// subtract the element's left and top position:
	return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

// change page on button click
function swapPage(x) {
	window.location.href = '../' + x + '/Index.html';
	return false; // prevent false navigation
}
