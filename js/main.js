        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Uniform definitions
        const uniforms = {
            iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
            iTime: { value: 0.0 },
        };

        // Fragment Shader
        const fragmentShader = `
        uniform vec3 iResolution;
        uniform float iTime;

        mat3 m = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64);

        float hash(float n)
        {
            return fract(sin(n) * 43758.5453);
        }

        float noise(in vec3 x)
        {
            vec3 p = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            float n = p.x + p.y * 57.0 + 113.0 * p.z;
            float res = mix(mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
                                mix(hash(n +  57.0), hash(n +  58.0), f.x), f.y),
                            mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                                mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
            return res;
        }

        float fbm(vec3 p)
        {
            float f;
            f  = 0.5000 * noise(p); p = m * p * 2.02;
            f += 0.2500 * noise(p); p = m * p * 2.03;
            f += 0.1250 * noise(p);
            return f;
        }

        float scene(in vec3 pos)
        {
            return 0.1 - length(pos) * 0.05 + fbm(pos * 0.3);
        }

        mat3 camera(vec3 ro, vec3 ta)
        {
            vec3 cw = normalize(ta - ro);
            vec3 cp = vec3(0.0, 1.0, 0.0);
            vec3 cu = cross(cw, cp);
            vec3 cv = cross(cu, cw);
            return mat3(cu, cv, cw);
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord)
        {
            vec2 uv = (fragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
            vec2 mo = vec2(iTime * 0.1, cos(iTime * 0.25) * 3.0);
            float camDist = 25.0;
            vec3 ta = vec3(0.0, 1.0, 0.0);
            vec3 ro = camDist * normalize(vec3(cos(2.75 - 3.0 * mo.x), 0.7 - 1.0 * (mo.y - 1.0), sin(2.75 - 3.0 * mo.x)));
            float targetDepth = 1.3;
            mat3 c = camera(ro, ta);
            vec3 dir = c * normalize(vec3(uv, targetDepth));
            const int sampleCount = 64;
            float zMax = 40.0;
            float zstep = zMax / float(sampleCount);
            vec3 p = ro;
            float T = 1.0;
            float absorption = 100.0;
            vec3 bg = mix(vec3(0.3, 0.1, 0.8), vec3(0.7, 0.7, 1.0), 1.0 - (uv.y + 1.0) * 0.5);
            vec4 color = vec4(0.0);
            for (int i = 0; i < sampleCount; i++)
            {
                float density = scene(p);
                if (density > 0.0)
                {
                    float tmp = density / float(sampleCount);
                    T *= 1.0 - (tmp * absorption);
                    if (T <= 0.01) break;
                    float opaity = 50.0;
                    float k = opaity * tmp * T;
                    vec4 cloudColor = vec4(1.0);
                    color += cloudColor * k;
                }
                p += dir * zstep;
            }
            color.rgb += bg;

            // Convert to Grayscale and adjust brightness
            float grayscale = dot(color.rgb, vec3(0.299, 0.587, 0.114)) * 0.7;

            fragColor = vec4(vec3(grayscale), color.a);
        }

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            mainImage(gl_FragColor, fragCoord);
        }
        `;

        // Shader Material
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: fragmentShader,
        });

        // Geometry and Mesh
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(plane);

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            uniforms.iTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
