export const vertex = `
uniform vec3 cameraVector;  
       
varying vec3 vPosition;
varying float intensity;


void main() {
    vec3 wPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    intensity = pow(1.0 - dot(normalize(cameraVector - wPosition), vNormal), 3.5) * 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPosition = position;
}
`

export const fragment = `
uniform sampler2D map;

varying vec3 vPosition;
varying float intensity;

#include <common>

void main() {

    vec3 direction = normalize(vPosition);
    vec2 sampleUV = equirectUv(direction);

    gl_FragColor = texture2D(map, sampleUV) + intensity;
}
`
