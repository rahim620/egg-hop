in vec3 modelPos;

void main() {
	if (modelPos.z >= 0.18 && modelPos.z <= 0.198) {
		gl_FragColor = vec4(1.0,0.3,0.3,1.0);
	}
	else if (modelPos.z > 0.9) {
		gl_FragColor = vec4(0.0,0.0,0.0,1.0);
	}
	else {
		gl_FragColor = vec4(1.0, 0.8, 0.8, 1.0);
	}
}
