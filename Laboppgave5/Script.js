const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');

let points = [];
let scale = 1;
let drawing,
	translation,
	scaling,
	rotation = false;

const drawPolygon = () => {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	for (i = 0; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	ctx.stroke();
};

const translatePolygon = (translationPoints) => {
	let offsetX = translationPoints.x - points[0].x;
	let offsetY = translationPoints.y - points[0].y;
	for (i = 0; i < points.length; i++) {
		points[i].x += offsetX;
		points[i].y += offsetY;
	}
	drawPolygon();
};

const scalePolygon = () => {
	let [centerX, centerY] = getCenter(points);
	for (i = 0; i < points.length; i++) {
		points[i].x = centerX + Math.sqrt(scale) * (points[i].x - centerX);
		points[i].y = centerY + Math.sqrt(scale) * (points[i].y - centerY);
	}
	scale = 1;
	drawPolygon();
};

const rotatePolygon = () => {
	for (i = 0; i < points.length; i++) {
		[newx, newy] = rotate(points[i].x, points[i].y, 30);
		points[i].x = newx;
		points[i].y = newy;
	}
	drawPolygon();
};

const getCenter = (arr) => {
	var minX, maxX, minY, maxY;
	for (var i = 0; i < arr.length; i++) {
		minX = arr[i].x < minX || minX == null ? arr[i].x : minX;
		maxX = arr[i].x > maxX || maxX == null ? arr[i].x : maxX;
		minY = arr[i].y < minY || minY == null ? arr[i].y : minY;
		maxY = arr[i].y > maxY || maxY == null ? arr[i].y : maxY;
	}
	return [(minX + maxX) / 2, (minY + maxY) / 2];
};

const rotate = (x, y, angle) => {
	let [centerX, centerY] = getCenter(points);
	var radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = cos * (x - centerX) + sin * (y - centerY) + centerX,
		ny = cos * (y - centerY) - sin * (x - centerX) + centerY;
	return [nx, ny];
};

c.addEventListener('mousedown', function (event) {
	if (drawing) {
		let currx = event.clientX - c.offsetLeft;
		let curry = event.clientY - c.offsetTop;
		points.push({ x: currx, y: curry });
		drawPolygon();
	}
	if (translation) {
		let currx = event.clientX - c.offsetLeft;
		let curry = event.clientY - c.offsetTop;
		let translationPoints = { x: currx, y: curry };
		translatePolygon(translationPoints);
	}
	if (rotation) {
		rotatePolygon();
	}
});

c.addEventListener('wheel', (event) => {
	if (scaling) {
		scale += event.deltaY * -0.001;
		scalePolygon();
	}
});

const newPolygon = () => {
	translation = scaling = rotation = false;
	drawing = !drawing;
	if (drawing) {
		points = [];
		ctx.clearRect(0, 0, c.width, c.height);
	}
};

const newTranslation = () => {
	drawing = scaling = rotation = false;
	translation = !translation;
};

const newScaling = () => {
	drawing = translation = rotation = false;
	scaling = !scaling;
};

const newRotation = () => {
	drawing = translation = scaling = false;
	rotation = !rotation;
};
