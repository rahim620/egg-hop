uniform vec3 lightPosition;
uniform vec3 moveDirection;

out vec3 viewPosition;
out vec3 worldPosition;
out vec3 interpolatedNormal;

void main() {

    worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    viewPosition = cameraPosition;

    interpolatedNormal = normalize((inverse(transpose(modelMatrix)) * vec4(normal, 1.0)).xyz);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
