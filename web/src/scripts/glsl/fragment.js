export const projectFragment = `

  uniform sampler2D uTexture;
  uniform float uAlpha;
  uniform vec2 uRes;
  uniform vec2 uRatio;
  varying vec2 vUv;

  vec2 backgroundCoverUv(vec2 screenSize, vec2 imageSize, vec2 uv) {
    float screenRatio = screenSize.x / screenSize.y;
    float imageRatio = imageSize.x / imageSize.y;
    vec2 newSize = screenRatio < imageRatio
      ? vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y)
      : vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x);
    vec2 newOffset = (screenRatio < imageRatio
      ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
      : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
    return uv * screenSize / newSize + newOffset;
  }

  void main() {

    vec4 color = vec4(0.0);
    vec2 uv = backgroundCoverUv(vec2(1.,1.25), uRatio, vUv);

    color = texture2D(uTexture,uv);

    gl_FragColor = vec4(vec3(color), uAlpha);
  }

`

export const backgroundFragment = `

  uniform float uR1;
  uniform float uR2;  
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  

  float Circle (vec2 uv, vec2 pos, float r, float blur) {

    float d = length(uv + pos);
    float c = smoothstep(r, r - blur, d);

    return c;
  } 

  void main() {

    vec2 p = vUv;

    vec3 lightGrey = vec3(0.9607843137254902, 0.9607843137254902, 0.9607843137254902);
    vec3 darkGrey = vec3(0.55, 0.55, 0.55);
    vec3 gold = vec3(0.803921568627451, 0.6901960784313725, 0.4588235294117647);
    vec3 color = vec3(uColor.r, uColor.g, uColor.b);

    if(gold == color) {
      
    } else {
      darkGrey = vec3(uColor.r, uColor.g, uColor.b) / 0.75;
      gold = color;
    }

    p -= 0.5;

    float circle1 = Circle(p, vec2( - .15, .18), uR1, 0.34);
    float circle2 = Circle(p, vec2(  0.3, -.12), uR2, 0.30);

    // Mixtures
    vec3 color1 = mix(lightGrey, gold, circle1);
    vec3 color2 = mix(lightGrey, darkGrey, circle2);
    vec3 c = min(color1, color2);




    gl_FragColor = vec4(c, 1.);
  }

`

export const backgroundFragmentSingle = `

  uniform float uR1;
  uniform float uR2;  
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  float Circle (vec2 uv, vec2 pos, float r, float blur) {

    float d = length(uv + pos);
    float c = smoothstep(r, r - blur, d);

    return c;
  } 

  void main() {

    vec2 p = vUv;
    vec3 lightGrey = vec3(0.9607843137254902, 0.9607843137254902, 0.9607843137254902);
    vec3 darkGrey = vec3(0.55, 0.55, 0.55);
    vec3 gold = vec3(uColor.r, uColor.g, uColor.b);

    p -= 0.5;

    float color = 0.;

    float circle1 = Circle(p, vec2( 0.32, -.12), uR2, 0.30);
   
    // Mixtures
    vec3 c = mix(lightGrey, gold, circle1);
   


    gl_FragColor = vec4(c, 1.);
  }

`
