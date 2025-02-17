// SETUP MOUSE

// Setup raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const click = new THREE.Vector2();

// Update mouse coordinates on mouse move
window.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both axes
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Update click coordinates on mouse click
window.addEventListener('click', onMouseClick, false);
function onMouseClick(event) {
  // Calculate click position in normalized device coordinates (-1 to +1) for both axes
  click.x = (event.clientX / window.innerWidth) * 2 - 1;
  click.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (!hopping)
    updatePosition();
}




// EGG MOVEMENT

// Variables for hopping
var hopping = false;
var hopStartTime = 0.0;
var moveDirection = new THREE.Vector3();

// Floor intersection plane
const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.0);

function updatePosition() {
  raycaster.setFromCamera(click, camera);

  // Calculate intersection point with the plane
  const intersectPoint = new THREE.Vector3();
  raycaster.ray.intersectPlane(floorPlane, intersectPoint);

  moveDirection.copy(intersectPoint).sub(window.egg.position).normalize();

  hopping = true;
  hopStartTime = clock.getElapsedTime();
}


// Hopping and movement
function hop() {
  const initialHeight = 1.0;
  const hopDuration = 0.5;
  const hopHeight = 3.0;

  let t = clock.getElapsedTime() - hopStartTime;

  ypos = initialHeight + hopHeight * Math.sin(Math.PI*t/hopDuration);

  if (ypos >= initialHeight) {
    window.egg.position.y = ypos;
    window.egg.position.addScaledVector(moveDirection, 0.08); // Move in the direction of click
  } else {
    window.egg.position.y = initialHeight;
    hopping = false;
  }
}



// EYE MOVEMENT 

// Cursor intersection plane
const eyesPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 15.0);

function updateEyes() {
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersection point with the plane
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(eyesPlane, intersectPoint);

    leftEye.lookAt(intersectPoint);
    rightEye.lookAt(intersectPoint);
}



// SETUP UPDATE CALLBACK

function update() {
  // if (!hopping)
  //   checkKeyboard();

  if (hopping)
    hop();

  updateEyes();

  eggMaterial.needsUpdate = true;
  eyeMaterial.needsUpdate = true;

  // Requests the next update call, this creates a loop
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

// START THE ANIMATION LOOP
update();










// // Hopping and movement
// function hop() {
//   const initialHeight = 1.0;
//   const hopDuration = 0.5;
//   const hopHeight = 3.0;

//   let t = clock.getElapsedTime() - hopStartTime;

//   ypos = initialHeight + hopHeight * Math.sin(Math.PI*t/hopDuration);

//   if (ypos >= initialHeight) {
//     window.egg.position.y = ypos;
    
//     if (keyPressed == "W")
//       window.egg.position.z -= 0.1;
//     else if (keyPressed == "S") 
//       window.egg.position.z += 0.1;
  
//     if (keyPressed == "A") 
//       window.egg.position.x -= 0.1;
//     else if (keyPressed == "D")
//       window.egg.position.x += 0.1;
//   } else {
//     window.egg.position.y = initialHeight;
//     keyPressed = null;
//     hopping = false;
//   }
// }