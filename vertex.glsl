attribute vec4 aVertexPosition;
uniform mat4 uTranslationMatrix;
varying vec2 posColor;
void main(void) {
    posColor = aVertexPosition.xy + 0.5;
    gl_Position = uTranslationMatrix * aVertexPosition;
}