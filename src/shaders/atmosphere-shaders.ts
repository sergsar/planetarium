export const vertex = `
       
varying vec3 vPosition;
varying float intensity;

uniform float melt;


void main() {
    vec3 wPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    vec3 cameraDirection = normalize(cameraPosition - wPosition);
    intensity = dot(cameraDirection, vNormal);
    float inner = 1.0 - intensity;
    float outer = intensity;
    intensity = clamp(inner * outer * 4.0 * melt, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPosition = position;
}
`

export const fragment = `
uniform vec3 color;

varying vec3 vPosition;
varying float intensity;

#include <common>

void main() {

    vec3 direction = normalize(vPosition);
    vec2 sampleUV = equirectUv(direction);

    gl_FragColor = vec4(color, intensity);
}
`
