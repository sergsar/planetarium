export const vertex = `
       
varying vec3 vPosition;
varying float intensity;


void main() {
    vec3 wPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    vec3 cameraDirection = normalize(cameraPosition - wPosition);
    intensity = dot(cameraDirection, vNormal);
    float inner = clamp(0.8 - intensity, 0.0, 1.0);
    float outer = intensity;
    intensity = inner * outer;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPosition = position;
}
`

export const fragment = `
varying vec3 vPosition;
varying float intensity;

#include <common>

void main() {

    vec3 direction = normalize(vPosition);
    vec2 sampleUV = equirectUv(direction);

    gl_FragColor = vec4(0.7, 0.7, 1.0, intensity);
    //gl_FragColor = vec4(vec3(1.0, 1.0, 1.0) * intensity, 1.0);
}
`
