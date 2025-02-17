uniform vec3 ambientColor;
uniform float kAmbient;

uniform vec3 diffuseColor;
uniform float kDiffuse;

uniform vec3 specularColor;
uniform float kSpecular;
uniform float shininess;

uniform vec3 lightPosition;

in vec3 interpolatedNormal;
in vec3 viewPosition;
in vec3 worldPosition;

void main() {

    // Ambient
    vec3 ambient = kAmbient * ambientColor;

    // Diffuse
    vec3 lightDir = normalize(lightPosition - worldPosition); // From fragment to light
    vec3 diffuse = kDiffuse * max(0.0, dot(lightDir, interpolatedNormal)) * diffuseColor;

    // Specular
    vec3 viewDir = normalize(viewPosition - worldPosition);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    vec3 specular = kSpecular * pow(max(0.0, dot(halfwayDir, interpolatedNormal)), shininess) * specularColor;
    
    
    gl_FragColor = vec4((ambient+diffuse+specular), 1.0);

}
