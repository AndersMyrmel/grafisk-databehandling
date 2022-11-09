const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.position.z = -180;
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

const illumination = 2.5;
let light = new THREE.HemisphereLight('#ffffff', '#444444', 0, 1);
light.position.set(0, 500, 0);
scene.add(light);
light = new THREE.DirectionalLight(0xffffff, illumination);
light.position.set(0, 200, -800);
light.castShadow = true;
light.shadow.camera.top = 400;
light.shadow.camera.bottom = -200;
light.shadow.camera.left = -400;
light.shadow.camera.right = 400;
light.shadow.camera.far = 2000;
light.shadow.mapSize.set(2048, 2048);
light.shadow.radius = 3;
light.shadowMapVisible = true;
scene.add(light);

const plane = new THREE.PlaneGeometry(2000, 2000);
const matOption = { color: '#a6a6a6', depthWrite: false };
const mat = new THREE.MeshPhongMaterial(matOption);
const mesh = new THREE.Mesh(plane, mat);
mesh.position.y = 0.001; // so we're above the ground slightly
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const grid = new THREE.GridHelper(3000, 30, '#000000', '#9a9a9a');
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

const GLTObjectModel = {
	Object_01: null,
	Object_02: null,
};

const loader = new THREE.GLTFLoader();
loader.load('./assets/WindTurbine.glb', GLTFLoadDone);

function GLTFLoadDone(GLTFStructure) {
	GLTFStructure.scene.traverse(GLTFEachObject);
	GLTObjectModel.Object_01 =
		GLTFStructure.scene.getObjectByName('Main_Section');
	GLTObjectModel.Object_02 = GLTFStructure.scene.getObjectByName('Blades');
	console.log(GLTObjectModel.Object_02);
	scene.add(GLTFStructure.scene);
}

function GLTFEachObject(aObject) {
	if (aObject.isMesh) {
		aObject.castShadow = true;
		aObject.receiveShadow = true;
	} else if (aObject.isGroup) {
		aObject.castShadow = true;
		GLTObjectModel[aObject.name] = aObject;
	}
}

function animate() {
	if (GLTObjectModel.Object_02) {
		GLTObjectModel.Object_02.rotation.z += 0.005;
		GLTObjectModel.Object_02.position.x = -0.005;
	}
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
