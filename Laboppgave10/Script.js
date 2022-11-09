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

const grid = new THREE.GridHelper(2000, 20, '#000000', '#9a9a9a');
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const GLTObjectModel = {
	Object_01: null,
	Object_02: null,
	Object_03: null,
};

const loader = new THREE.GLTFLoader();
loader.load('./assets/WindTurbine.glb', GLTFLoadDone);

function GLTFLoadDone(GLTFStructure) {
	GLTFStructure.scene.traverse(GLTFEachObject);
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

//let loadedModel;
//const gltfLoader = new THREE.GLTFLoader();
//gltfLoader.load('./assets/WindTurbine.glb', (gltfScene) => {
//	loadedModel = gltfScene;
//	gltfScene.scene.position.y = -10;
//	gltfScene.scene.position.z = -10;
//	gltfScene.scene.scale.set(1, 1, 1);
//	scene.add(gltfScene.scene);
//});

console.log(GLTObjectModel);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
