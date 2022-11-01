const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
	-1, 1, 1, 0, -1, 0, 1, 1, 1,

	-1, 1, -1, 0, -1, 0, -1, 1, 1,

	1, 1, 1, 0, -1, 0, 1, 1, -1,

	1, 1, -1, 0, -1, 0, -1, 1, -1,

	-1, 1, -1, -1, 1, 1, 1, 1, -1,

	1, 1, -1, -1, 1, 1, 1, 1, 1,
]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

const gui = new dat.GUI();
gui.add(mesh.rotation, 'x', 0, 10).name('Rotate X axis');
gui.add(mesh.rotation, 'y', 0, 10).name('Rotate Y axis');
gui.add(mesh.rotation, 'z', 0, 10).name('Rotate Z axis');

function animate() {
	requestAnimationFrame(animate);
	mesh.rotation.x += mesh.rotation.x / 1000;
	mesh.rotation.y += mesh.rotation.y / 1000;
	mesh.rotation.z += mesh.rotation.z / 1000;
	renderer.render(scene, camera);
}

animate();
