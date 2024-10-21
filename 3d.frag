precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uSampler;
uniform vec3 uAmbientLight;
uniform vec3 uDirectionalLightColor; // Add this line
uniform vec3 uDirectionalLightDirection; // Add this line

void main(void) {
    // Normalize the normal vector
    vec3 normal = normalize(vNormal);

    // Calculate the directional light effect
    vec3 lightDirection = normalize(uDirectionalLightDirection);
    float directionalLightIntensity = max(dot(normal, lightDirection), 0.0);
    vec3 directionalLight = uDirectionalLightColor * directionalLightIntensity;

    // Combine the ambient and directional light
    vec4 lighting = vec4(uAmbientLight + directionalLight, 1.0);
    gl_FragColor = vColor * lighting * texture2D(uSampler, vTextureCoord);
}