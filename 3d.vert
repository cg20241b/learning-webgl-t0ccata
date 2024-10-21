attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aVertexColor;
attribute vec3 aVertexNormal;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPosition;

uniform mat4 uTranslationMatrix;
uniform mat4 uZRotationMatrix;
uniform mat4 uYRotationMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main(void) {
    vec4 position = vec4(aVertexPosition, 1.0);
    mat4 modelMatrix = uTranslationMatrix * uZRotationMatrix * uYRotationMatrix;
    gl_Position = uProjectionMatrix * uViewMatrix * modelMatrix * position;
    vTextureCoord = aTextureCoord;
    vNormal = mat3(modelMatrix) * aVertexNormal; // Transform the normal vector
    vPosition = vec3(modelMatrix * position); // Pass the transformed position
    vColor = aVertexColor;
}