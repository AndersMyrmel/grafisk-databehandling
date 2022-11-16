const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.position.z = -40;
camera.position.x = 30;
camera.position.y = 30;
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

const illumination = 2.5;
let light = new THREE.HemisphereLight('#ffffff', '#444444', 0, 1);
light.position.set(0, 500, 0);
scene.add(light);
light = new THREE.DirectionalLight(0xffeacb, illumination);
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
const matOption = { color: '#ffffff', depthWrite: false };
const mat = new THREE.MeshPhongMaterial(matOption);
const mesh = new THREE.Mesh(plane, mat);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const grid = new THREE.GridHelper(3000, 30, '#000000', '#ffffff');
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

const GLTObjectModel = {
	Object_01: null,
	Object_02: null,
	Object_03: null,
	Object_04: null,
};

const loader = new THREE.GLTFLoader();
loader.load('./assets/Excavator.glb', GLTFLoadDone);

function GLTFLoadDone(GLTFStructure) {
	GLTFStructure.scene.traverse(GLTFEachObject);
	GLTObjectModel.Object_01 = GLTFStructure.scene.getObjectByName('Base');
	GLTObjectModel.Object_02 = GLTFStructure.scene.getObjectByName('Arm1');
	GLTObjectModel.Object_03 = GLTFStructure.scene.getObjectByName('Arm2');
	GLTObjectModel.Object_04 = GLTFStructure.scene.getObjectByName('Spade');

	//mesh.position.y = GLTObjectModel.Object_01.position.y;
	//grid.position.y = GLTObjectModel.Object_01.position.y;
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
//var controls = {
//	rotation: -0.004,
//};
//const gui = new dat.GUI();
//gui.add(controls, 'rotation', -10, 10).onChange(function (value) {
//	rotationAngle = (value * Math.PI) / 180;
//});

function animate() {
	if (GLTObjectModel.Object_02) {
	}
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
