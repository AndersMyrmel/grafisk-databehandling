const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
camera.position.set(25, 25, -30);
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

var controls = {
	Direction: false,
	count1: 0,
	count2: 0,
	count3: 0,
	Arm1: function () {
		if (!this.Direction) {
			if (this.count1 < 5) {
				GLTObjectModel.Object_02.rotation.x -= 0.1;
				GLTObjectModel.Object_02.position.z -= 0.7;
				GLTObjectModel.Object_03.rotation.x += 0.01;
				GLTObjectModel.Object_03.position.z -= 1.5;
				GLTObjectModel.Object_04.position.z -= 1.5;
				this.count1 += 1;
			}
		} else {
			if (this.count1 > 0) {
				GLTObjectModel.Object_02.rotation.x += 0.1;
				GLTObjectModel.Object_02.position.z += 0.7;
				GLTObjectModel.Object_03.rotation.x -= 0.01;
				GLTObjectModel.Object_03.position.z += 1.5;
				GLTObjectModel.Object_04.position.z += 1.5;
				this.count1 -= 1;
			}
		}
	},
	Arm2: function () {
		if (!this.Direction) {
			if (this.count2 < 5) {
				GLTObjectModel.Object_03.rotation.x += 0.1;
				GLTObjectModel.Object_03.position.y += 0.7;
				GLTObjectModel.Object_04.position.y += 1.5;
				this.count2 += 1;
			}
		} else {
			if (this.count2 > 0) {
				GLTObjectModel.Object_03.rotation.x -= 0.1;
				GLTObjectModel.Object_03.position.y -= 0.7;
				GLTObjectModel.Object_04.position.y -= 1.5;
				this.count2 -= 1;
			}
		}
	},
	Bucket: function () {
		if (!this.Direction) {
			if (this.count3 < 5) {
				GLTObjectModel.Object_04.rotation.x += 0.1;
				GLTObjectModel.Object_04.position.z -= 0.3;
				this.count3 += 1;
			}
		} else {
			if (this.count3 > 0) {
				GLTObjectModel.Object_04.rotation.x -= 0.1;
				GLTObjectModel.Object_04.position.z += 0.3;
				this.count3 -= 1;
			}
		}
	},
};

const gui = new dat.GUI();
gui.add(controls, 'Direction').name('Change Direction');
gui.add(controls, 'Arm1').name('Move Arm One');
gui.add(controls, 'Arm2').name('Move Arm Two');
gui.add(controls, 'Bucket').name('Move Bucket');

document.addEventListener('keydown', (event) => {
	if (event.key.toLowerCase() == 'w') {
		moveExcavator('z', -2);
	} else if (event.key.toLowerCase() == 'a') {
		moveExcavator('x', -2);
	} else if (event.key.toLowerCase() == 's') {
		moveExcavator('z', 2);
	} else if (event.key.toLowerCase() == 'd') {
		moveExcavator('x', 2);
	}
});

function moveExcavator(direction, speed) {
	for (let i = 1; i < 5; i++) {
		GLTObjectModel[`Object_0${i}`].position[direction] += speed;
	}
}

function animate() {
	if (GLTObjectModel.Object_02) {
	}
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
