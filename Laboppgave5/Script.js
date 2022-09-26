const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

let points = [];

const drawPolygon = () => {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	for (i = 0; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	ctx.stroke();
};

c.addEventListener('mousedown', function (event) {
	let currx = event.clientX - c.offsetLeft;
	let curry = event.clientY - c.offsetTop;
	points.push({ x: currx, y: curry });
	drawPolygon();
});

const clearCanvas = () => {
	ctx.clearRect(0, 0, c.width, c.height);
	points = [];
};
