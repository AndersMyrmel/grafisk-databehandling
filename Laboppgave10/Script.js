const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.position.z = -180;
//camera.position.x = 50;
//camera.position.y = -50;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

let loadedModel;
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('./assets/WindTurbine.glb', (gltfScene) => {
	gltfScene.scene.position.y = -10;
	gltfScene.scene.position.z = -10;
	gltfScene.scene.scale.set(1, 1, 1);
	scene.add(gltfScene.scene);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
