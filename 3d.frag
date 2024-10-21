precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uSampler;
uniform vec3 uAmbientIntensity; // ia in the phong model equation
uniform vec3 uLightColor; // ka, kd and ks in the phong model equation
//uniform vec3 uDirectionalLightDirection; // Add this line
uniform vec3 uPointLightPosition; // Add this line

void main(void) {
    // Normalize the normal vector
    vec3 N = normalize(vNormal);


    vec3 ambient = uLightColor * uAmbientIntensity;

    // Calculate the diffuse light effect
    vec3 L = normalize(uPointLightPosition - vPosition);
    float LdotN = max(dot(N,L), 0.0);
    vec3 diffuse = uLightColor * LdotN; // kd * L•N

    // Calculate the specular light effect
    vec3 R = reflect(-L, N);
    vec3 V = normalize(-vPosition);
    float RdotV = max(dot(R, V), 0.0);
    RdotV = pow(RdotV, 32.0); // shininess factor, alpha = 32
    vec3 specular = uLightColor * RdotV; // ks * (R•V)^alpha

    // Combine the ambient and directional light
    vec4 phongReflection = vec4(ambient + diffuse + specular, 1.0);
    gl_FragColor = vColor * phongReflection * texture2D(uSampler, vTextureCoord);
}