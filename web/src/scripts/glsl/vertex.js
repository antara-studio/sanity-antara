export const projectVertex = `
  uniform vec2 uOffset;
  varying vec2 vUv;
  uniform vec2 uRes;

  #define M_PI 3.1415926535897932384626433832795

  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  position.x = position.x + (sin(uv.y * M_PI) * offset.x);
  position.y = position.y + (sin(uv.x * M_PI) * offset.y);
  return position;
  }

  void main() {
  vUv =  uv - (uOffset * .002);
  
  vec3 newPosition = deformationCurve(position, uv, uOffset);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }

`

export const backgroundVertex = `
  varying vec2 vUv;
  void main() {
  vUv =  uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }

`
