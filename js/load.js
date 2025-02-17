/**
 * Loads and places objects and meshes in the world
 */

// Setup and return the scene and related objects.
const {
    renderer,
    scene,
    camera,
    worldFrame,
  } = setup();

// Use THREE.Clock for animation
var clock = new THREE.Clock();
clock.start();

// Light
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(10,15,10);
light.castShadow = true;
scene.add(light);

// Blinn-Phong shading parameters to pass as uniforms
const ambientColor = { type: "c", value: new THREE.Color(0.682, 0.322, 0.82) };
const diffuseColor = { type: "c", value: new THREE.Color(0.682, 0.322, 0.82) };
const specularColor = { type: "c", value: new THREE.Color(1.0, 1.0, 1.0) };

const kAmbient = { type: "f", value: 0.3 };
const kDiffuse = { type: "f", value: 0.6 };
const kSpecular = { type: "f", value: 1.0 };
const shininess = { type: "f", value: 50.0 };

const lightPosition = {type: 'v3', value: light.position};


// Materials: specify uniforms and shaders
const eggMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightPosition: lightPosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
  }
});

const eyeMaterial = new THREE.ShaderMaterial({});

// Load shaders.
const shaderFiles = [
  'glsl/egg.vs.glsl',
  'glsl/egg.fs.glsl',
  'glsl/eye.vs.glsl',
  'glsl/eye.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function (shaders) {
  eggMaterial.vertexShader = shaders['glsl/egg.vs.glsl'];
  eggMaterial.fragmentShader = shaders['glsl/egg.fs.glsl'];

  eyeMaterial.vertexShader = shaders['glsl/eye.vs.glsl'];
  eyeMaterial.fragmentShader = shaders['glsl/eye.fs.glsl'];
})

const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);

// Load and place Egg 
loadAndPlaceOBJ('model/egg.obj', eggMaterial, function (egg) {
  egg.position.set(0.0, 1.0, 0.0);
  egg.parent = worldFrame;
  egg.castShadow = true;
  egg.receiveShadow = true;
  scene.add(egg);

  // Egg eyes
  leftEye.position.set(-0.3, 0.9, 0.7); 
  leftEye.lookAt(camera.position);
  egg.add(leftEye);
  rightEye.position.set(0.3, 0.9, 0.7); 
  rightEye.lookAt(camera.position);
  egg.add(rightEye);

  window.egg = egg;
});